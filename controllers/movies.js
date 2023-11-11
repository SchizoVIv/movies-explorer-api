const validator = require('validator');
const MovieModel = require('../models/movie');

const {
  ForbiddenError,
  BadRequestError,
  NotFoundError,
} = require('../utils/errors');

const getMovies = async (req, res, next) => {
  try {
    const movies = await MovieModel.find({ owner: req.user._id });
    res.status(200).send({
      movies,
      message: `Список сохраненных фильмов: ${movies.length}`,
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
    .then((movie) => res.status(201).send(movie))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные при создании фильма'));
      } else {
        next(err);
      }
    });
};

const deleteMovieById = async (req, res, next) => {
  try {
    if (!validator.isMongoId(req.params.id)) {
      throw new BadRequestError('Переданы некорректные данные при удалении фильма');
    }

    const movie = await MovieModel.findById(req.params.id);

    if (movie == null || !movie) {
      throw new NotFoundError('Фильма с таким ID не найдено');
    }

    if (req.user._id !== movie.owner) {
      throw new ForbiddenError('Удаление чужих фильмов - запрещено');
    }

    await movie.deleteOne({});

    res.status(200).send({
      _id: movie._id,
      message: 'Фильм удален из избранного',
    });
  } catch (err) {
    if (err.name === 'CastError') {
      next(new BadRequestError('Фильма с таким ID не найдено'));
    } else {
      next(err);
    }
  }
};

module.exports = { getMovies, addMovie, deleteMovieById };
