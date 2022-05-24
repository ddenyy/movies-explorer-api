const mongoose = require('mongoose');
const isURL = require('validator/lib/isURL');

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
      message: 'Неккоректная ссылка постер',
    },
  },
  trailerLink: {
    required: true,
    type: String,
    validate: {
      validator: (v) => { isURL(v); },
      message: 'Неккоректная ссылка на трейлей',
    },
  },
  thumbnail: {
    required: true,
    type: String,
    validate: {
      validator: (v) => { isURL(v); },
      message: 'Неккоректная ссылка на мини постер',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  movieId: {
    type: String,
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
