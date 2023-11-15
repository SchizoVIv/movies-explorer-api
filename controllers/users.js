const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const {
  ERR_TEXT_BAD_PROFILE,
  ERR_TEXT_NOTFOUND,
  ERR_TEXT_BAD_CREDENTIALS,
  ERR_TEXT_NO_CREDENTIALS,
  ERR_TEXT_NO_USER,
  ERR_TEXT_BAD_LOGIN,
  ERR_TEXT_BAD_OUT,
  STATUS_CREATED,
  STATUS_OK,
  TEXT_OUT,
  SOLT_ROUNDS,
  ERR_TEXT_CONFLICT_EMAIL,
} = require('../utils/constants');

const UserModel = require('../models/user');

const { NotFoundError } = require('../errors/NotFoundError');
const { BadRequestError } = require('../errors/BadRequestError');
const { UnauthorizedError } = require('../errors/UnauthorizedError');
const { ConflictError } = require('../errors/ConflictError');

const getUser = (req, res, next) => {
  const userId = req.user._id;
  UserModel.findById(userId)
    .then((user) => {
      if (user === null) throw new NotFoundError(ERR_TEXT_NOTFOUND);

      return res.status(STATUS_OK).send({ user });
    })
    .catch((err) => next(err));
};

const updateUserInfo = (req, res, next) => {
  const { name, email } = req.body;
  UserModel.findByIdAndUpdate(req.user._id, { name, email }, { new: true, runValidators: true })
    .orFail()
    .then((user) => {
      if (user) {
        return res.status(STATUS_OK).send({
          name: user.name,
          email: user.email,
          _id: user._id,
        });
      }

      throw new NotFoundError(ERR_TEXT_NOTFOUND);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(ERR_TEXT_BAD_PROFILE));
      } else {
        next(err);
      }
    });
};

const createUser = async (req, res, next) => {
  const { name, email, password } = req.body;
  try {
    if (!email || !password || !name) {
      throw new BadRequestError(ERR_TEXT_BAD_CREDENTIALS);
    }

    const hash = await bcrypt.hash(password, SOLT_ROUNDS);

    const user = await UserModel.create({ name, email, password: hash });

    res.status(STATUS_CREATED).json({ name: user.name, email: user.email, _id: user._id });
  } catch (err) {
    if (err.code === 11000) {
      next(new ConflictError(ERR_TEXT_CONFLICT_EMAIL));
    } else {
      next(err);
    }
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new BadRequestError(ERR_TEXT_NO_CREDENTIALS);
    }

    const user = await UserModel.findOne({ email }).select('+password');

    if (!user) {
      throw new UnauthorizedError(ERR_TEXT_NO_USER);
    }

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
      throw new UnauthorizedError(ERR_TEXT_BAD_LOGIN);
    }

    const payload = { _id: user._id, email: user.email };

    const token = jwt.sign(payload, process.env.NODE_ENV === 'production' ? process.env.JWT_SECRET : 'dev_secret', { expiresIn: '7d' });

    res.cookie('jwt', token, {
      maxAge: 3600000 * 24 * 7,
      httpOnly: true,
      sameSite: true,
    });

    res.status(STATUS_OK).send({ token });
  } catch (err) {
    next(err);
  }
};

const logout = async (req, res) => {
  if (res.cookie) {
    await res.clearCookie('jwt');
    res.status(STATUS_OK).send({ message: TEXT_OUT });
  }
  if (!res.cookie) {
    throw new BadRequestError(ERR_TEXT_BAD_OUT);
  }
};

module.exports = {
  createUser,
  updateUserInfo,
  login,
  getUser,
  logout,
};
