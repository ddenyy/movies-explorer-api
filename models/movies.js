const mongoose = require('mongoose');
const isURL = require('validator/lib/isURL');
const { INVALID_URL_FORMAT } = require('../utils/constants');

const movieSchema = new mongoose.Schema({
  country: {
    required: true,
    type: String,
  },
  director: {
    required: true,
    type: String,
  },
  duration: {
    required: true,
    type: Number,
  },
  year: {
    required: true,
    type: String,
  },
  description: {
    required: true,
    type: String,
  },
  image: {
    required: true,
    type: String,
    validate: {
      validator: (v) => { isURL(v); },
      message: INVALID_URL_FORMAT,
    },
  },
  trailerLink: {
    required: true,
    type: String,
    validate: {
      validator: (v) => { isURL(v); },
      message: INVALID_URL_FORMAT,
    },
  },
  thumbnail: {
    required: true,
    type: String,
    validate: {
      validator: (v) => { isURL(v); },
      message: INVALID_URL_FORMAT,
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  movieId: {
    type: Number,
    required: true,
  },
  nameRU: {
    type: String,
    required: true,
  },
  nameEN: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('movie', movieSchema);
