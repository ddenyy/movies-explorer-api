const { celebrate, Joi } = require('celebrate');
const { WRONG_URL_FORMAT } = require('../constants');
const validator = require('validator');
// валидация логина
const signInValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
});

// валидация регистрации
const signUpValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
});

const updateUserValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
  }),
});

const movieIdValidation = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().required().length(24).hex(),
  }),
});

const createMovieValidation = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required().min(3),
    director: Joi.string().required().min(2),
    year: Joi.string().required().min(4),
    duration: Joi.number().required(),
    description: Joi.string().required(),
    image: Joi.string().required().custom((value, helpers) => {
      if (validator.isUrl(value)) {
        return value;
      }
      return helpers.message(WRONG_URL_FORMAT);
    }),
    trailerLink: Joi.string().required().custom((value, helpers) => {
      if (validator.isUrl(value)) {
        return value;
      }
      return helpers.message(WRONG_URL_FORMAT);
    }),
    thumbnail: Joi.string().required().custom((value, helpers) => {
      if (validator.isUrl(value)) {
        return value;
      }
      return helpers.message(WRONG_URL_FORMAT);
    }),
    owner: Joi.string().hex().length(24),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
});

module.exports = {
  signUpValidation,
  signInValidation,
  updateUserValidation,
  createMovieValidation,
  movieIdValidation,
};
