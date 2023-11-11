const URI_PATTERN = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/i;
const { celebrate, Joi } = require('celebrate');

const signinValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
});

const signupValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
    name: Joi.string().min(2).max(30),
  }),
});

const updateUserValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
  }),
});

const idValidation = celebrate({
  params: Joi.object().keys({
    id: Joi.string().required().pattern(new RegExp('^[0-9a-fA-F]{24}$')),
  }),
});

const movieValidation = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required().messages({
      'string.empty': 'Поле {#label} не может быть пустым',
      'any.required': 'Поле {#label} обязательное',
    }),
    director: Joi.string().required().messages({
      'string.empty': 'Поле {#label} не может быть пустым',
      'any.required': 'Поле {#label} обязательное',
    }),
    duration: Joi.number().required().messages({
      'number.base': 'Поле {#label} должно содержать только цифры.',
      'any.required': 'Поле {#label} обязательное',
    }),
    year: Joi.string().required().messages({
      'string.empty': 'Поле {#label} не может быть пустым',
      'any.required': 'Поле {#label} обязательное',
    }),
    description: Joi.string().required().messages({
      'string.empty': 'Поле {#label} не может быть пустым',
      'any.required': 'Поле {#label} обязательное',
    }),
    image: Joi.string().required().pattern(URI_PATTERN).uri()
      .messages({
        'string.empty': 'Поле {#label} не может быть пустым',
        'string.uri': 'Поле {#label}: URL должен быть валидным',
        'string.pattern.base':
        'Поле {{#label}}: URL должен быть валидным паттерну',
        'any.required': 'Поле {#label} обязательное',
      }),
    trailerLink: Joi.string().required().pattern(URI_PATTERN).uri()
      .messages({
        'string.empty': 'Поле {#label} не может быть пустым',
        'string.uri': 'Поле {#label}: URL должен быть валидным',
        'string.pattern.base':
        'Поле {{#label}}: URL должен быть валидным паттерну',
        'any.required': 'Поле {#label} обязательное',
      }),
    thumbnail: Joi.string().required().pattern(URI_PATTERN).uri()
      .messages({
        'string.empty': 'Поле {#label} не может быть пустым',
        'string.uri': 'Поле {#label}: URL должен быть валидным',
        'string.pattern.base':
        'Поле {{#label}}: URL должен быть валидным паттерну',
        'any.required': 'Поле {#label} обязательное',
      }),
    movieId: Joi.number().messages({
      'number.base': 'Поле {#label} должно содержать только цифры.',
      'any.required': 'Поле {#label} обязательное',
    }),
    nameRU: Joi.string().required().messages({
      'string.empty': 'Поле {#label} не может быть пустым',
      'any.required': 'Поле {#label} обязательное',
    }),
    nameEN: Joi.string().required().messages({
      'string.empty': 'Поле {#label} не может быть пустым',
      'any.required': 'Поле {#label} обязательное',
    }),
  }),
});

module.exports = {
  signinValidation,
  signupValidation,
  updateUserValidation,
  idValidation,
  movieValidation,
};
