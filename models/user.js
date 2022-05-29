const mongoose = require('mongoose');
const isEmail = require('validator/lib/isEmail');
const bcrypt = require('bcrypt');
const {
  INVALID_EMAIL,
  INVALID_PAS_OR_EMAIL,
} = require('../utils/constants');

const userSchema = new mongoose.Schema({
  email: {
    required: true,
    type: String,
    validate: {
      validator: (v) => { isEmail(v); },
      message: INVALID_EMAIL,
    },
    unique: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
});

userSchema.statics.findUserByCredentials = function findUserByCredentials(email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      // пользователь не найден
      if (!user) {
        return Promise.reject(new Error(INVALID_PAS_OR_EMAIL));
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new Error(INVALID_PAS_OR_EMAIL));
          }
          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
