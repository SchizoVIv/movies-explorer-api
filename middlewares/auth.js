const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/UnauthorizedError');
const {
  ERR_TEXT_NO_AUTH,
  ERR_TEXT_NO_TOKEN,
} = require('../utils/constants');

const auth = (req, res, next) => {
  const { authorization } = req.headers;
  const bearer = 'Bearer ';

  if (!authorization || !authorization.startsWith(bearer)) {
    return next(new UnauthorizedError(ERR_TEXT_NO_AUTH));
  }
  const token = authorization.replace(bearer, '');

  if (!token) {
    return next(new UnauthorizedError(ERR_TEXT_NO_TOKEN));
  }

  let payload;

  try {
    payload = jwt.verify(token, process.env.NODE_ENV === 'production' ? process.env.JWT_SECRET : 'dev_secret');
  } catch (error) {
    return next(new UnauthorizedError(ERR_TEXT_NO_AUTH));
  }

  req.user = payload;

  return next();
};

module.exports = { auth };
