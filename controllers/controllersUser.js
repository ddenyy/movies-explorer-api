const { NODE_ENV, JWT_SECRET = 'dev-key' } = process.env;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const ConflictError = require('../errors/ConflictError');
const BadRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFoundError');
const UnauthorizedError = require('../errors/UnauthorizedError');
const { developJwt } = require('../utils/config');
const {
  USER_NOT_FOUND,
  INVALID_DATA_CREATE_USER,
  EMAIL_ALREADY_EXISTS,
  INVALID_PAS_OR_EMAIL,
} = require('../utils/constants');

// создает нового пользователя регистрация /signup
module.exports.createUser = (req, res, next) => {
  const {
    name,
    email,
    password,
  } = req.body;

  // хэшируем пароль
  return bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name,
      email,
      password: hash,
    }))
    .then(() => res.send({
      name,
      email,
    }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequestError(INVALID_DATA_CREATE_USER));
      }
      if (err.code === 11000) {
        return next(new ConflictError(EMAIL_ALREADY_EXISTS));
      }
      return next(err);
    });
};

module.exports.getCurrentUser = (req, res, next) => {
  const { _id } = req.user;
  User.findById(_id)
    .then((user) => {
      if (!user) {
        return next(new NotFoundError(USER_NOT_FOUND));
      }
      return res.send({ email: user.email, name: user.name });
    })
    .catch(next);
};

module.exports.updateUserData = (req, res, next) => {
  const userId = req.user._id;
  const { email, name } = req.body;

  User.findByIdAndUpdate(userId, { name, email }, { runValidators: true, new: true })
    .then((user) => {
      if (!user) {
        return next(new NotFoundError(USER_NOT_FOUND));
      }
      return res.send({ email: user.email, name: user.name });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(USER_NOT_FOUND));
      } else if (err.code === 11000) {
        next(new ConflictError(EMAIL_ALREADY_EXISTS));
      } else {
        next(err);
      }
    });
};

// проверка логина и пароля
module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : developJwt, { expiresIn: '7d' });
      res.send({ token });
    })
    .catch(() => next(new UnauthorizedError(INVALID_PAS_OR_EMAIL)));
};
