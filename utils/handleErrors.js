const { ERR_INTERNAL_SERVER } = require('./constants');

const handleErrors = (err, _, res, next) => {
  const statusCode = err.statusCode || ERR_INTERNAL_SERVER;
  const messageError = statusCode === ERR_INTERNAL_SERVER ? 'На сервере произошла ошибка' : err.message;
  res.status(statusCode).send({
    code: res.statusCode,
    status: err.name,
    message: messageError,
  });
  next();
};

module.exports = handleErrors;
