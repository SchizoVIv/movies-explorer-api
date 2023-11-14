const rateLimit = require('express-rate-limit');

const limit = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10000,
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res, next, options) => {
    res
      .status(options.statusCode)
      .send(options.message);
  },
});

module.exports = { limit };
