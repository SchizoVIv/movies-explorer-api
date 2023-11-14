const { celebrate, Joi } = require('celebrate');
const {
  MONGO_PATTERN,
  URI_PATTERN,
} = require('../utils/constants');

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
    id: Joi.string().pattern(MONGO_PATTERN).messages({
      'string.pattern.base': 'Поле {#label} должен быть в формате MongoId.',
    }),
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
