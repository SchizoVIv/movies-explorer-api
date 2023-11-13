const { ERR_NOT_FOUND, ERR_TEXT_404 } = require('../utils/constants');

class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = ERR_NOT_FOUND;
  }
}

const error404 = (req, res, next) => next(new NotFoundError(ERR_TEXT_404));

module.exports = { NotFoundError, error404 };
