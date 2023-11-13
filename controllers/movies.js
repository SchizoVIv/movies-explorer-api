const validator = require('validator');
const MovieModel = require('../models/movie');
const {
  ERR_TEXT_BAD_CREATE_MOVIE,
  ERR_TEXT_BAD_DEL_MOVIE,
  ERR_TEXT_NO_MOVIE,
  ERR_TEXT_ELSE_MOVIE,
  STATUS_CREATED,
  STATUS_OK,
  TEXT_DELETE,
  TEXT_GET_MOVIE,
} = require('../utils/constants');

const {NotFoundError} = require('../errors/NotFoundError');
const {BadRequestError} = require('../errors/BadRequestError');
const {ForbiddenError} = require('../errors/UnauthorizedError');

const getMovies = async (req, res, next) => {
  try {
    const movies = await MovieModel.find({ owner: req.user._id });
    res.status(STATUS_OK).send({
      movies,
      message: `${TEXT_GET_MOVIE} ${movies.length}`,
    });
  } catch (err) {
    next(err);
  }
};

const addMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    thumbnail,
    trailerLink,
    movieId,
    nameRU,
    nameEN,
  } = req.body;

  const owner = req.user._id;

  MovieModel.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    thumbnail,
    trailerLink,
    movieId,
    nameRU,
    nameEN,
    owner,
  })
    .then((movie) => res.status(STATUS_CREATED).send(movie))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(ERR_TEXT_BAD_CREATE_MOVIE));
      } else {
        next(err);
      }
    });
};

const deleteMovieById = async (req, res, next) => {
  try {
    if (!validator.isMongoId(req.params.id)) {
      throw new BadRequestError(ERR_TEXT_BAD_DEL_MOVIE);
    }

    const movie = await MovieModel.findById(req.params.id);

    if (movie == null || !movie) {
      throw new NotFoundError(ERR_TEXT_NO_MOVIE);
    }

    if (req.user._id !== movie.owner) {
      throw new ForbiddenError(ERR_TEXT_ELSE_MOVIE);
    }

    await movie.deleteOne({});

    res.status(STATUS_OK).send({
      _id: movie._id,
      message: TEXT_DELETE,
    });
  } catch (err) {
    if (err.name === 'CastError') {
      next(new BadRequestError(ERR_TEXT_NO_MOVIE));
    } else {
      next(err);
    }
  }
};

module.exports = { getMovies, addMovie, deleteMovieById };
