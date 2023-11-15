const usersRouter = require('express').Router();
const { updateUserInfo, getUser } = require('../controllers/users');
const { updateUserValidation } = require('../middlewares/validations');

usersRouter.get('/me', getUser);
usersRouter.patch('/me', updateUserValidation, updateUserInfo);

module.exports = usersRouter;
