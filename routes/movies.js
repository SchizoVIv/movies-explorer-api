const moviesRouter = require('express').Router();
const { getMovies, addMovie, deleteMovieById } = require('../controllers/movies');
const { idValidation, movieValidation } = require('../middlewares/validations');

moviesRouter.get('/', getMovies);
moviesRouter.post('/', movieValidation, addMovie);
moviesRouter.delete('/:id', idValidation, deleteMovieById);

module.exports = moviesRouter;
