const Movie = require('../models/movies');
const BadRequestError = require('../errors/BadRequestError');
const ForbiddenError = require('../errors/ForbiddenError');
const NotFoundError = require('../errors/NotFoundError');
const {
  NOT_FOUND_MOVIE,
  INVALID_DATA_CREATE_MOVIE,
  ACCESS_RIGHTS_ERROR,
  INVALID_DATA_MOVIE_DELETE,
} = require('../utils/constants');
// запрос на вывод всех сохранённых фильмов из БД
module.exports.getMovies = (req, res, next) => {
  Movie.find({})
    .then((movies) => res.send({ movies }))
    .catch(next);
};

// создание (сохранение) фильма в БД
module.exports.createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    // тут был owner;
    movieId,
    nameRU,
    nameEN,
  } = req.body;
  const owner = req.user._id;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    owner,
    movieId,
    nameRU,
    nameEN,
  })
    .then((movie) => res.send({ movie }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequestError(INVALID_DATA_CREATE_MOVIE));
      }
      return next(err);
    });
};

module.exports.deleteMovie = (req, res, next) => {
  const { movieId } = req.params;
  const { _id } = req.user;

  Movie.findById(movieId)
    .orFail(() => next(new NotFoundError(NOT_FOUND_MOVIE)))
    .then((movie) => {
      if (movie.owner.valueOf() !== _id) {
        next(new ForbiddenError(ACCESS_RIGHTS_ERROR));
      } else {
        movie.remove()
          .then(() => res.send({ movie }))
          .catch(next);
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError(INVALID_DATA_MOVIE_DELETE));
      } else {
        next(err);
      }
    });
};
