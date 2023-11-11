const router = require('express').Router();
const usersRouter = require('./users');
const moviesRouter = require('./movies');
const authsRouter = require('./auths');
const { auth } = require('../middlewares/auth');
const { error404 } = require('../utils/errors');

router.use('/users', auth, usersRouter);
router.use('/movies', auth, moviesRouter);
router.use('/', authsRouter);
router.use('/*', error404);

module.exports = router;
