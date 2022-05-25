const router = require('express').Router();
const Movie = require('../models/movies');


// запрос на вывод всех сохранённых фильмов из БД
module.exports.getMovies = (req, res, next) => {
  Movie.find({})
    .then((movies) => res.status(200).send({ movies }))
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
    .then((movie) => res.status(200).send({ movie }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequestError('переданы невалидные данные фильма'));
      }
      return next(err);
    })
}

module.exports.deleteMovie = (req, res, next) => {
  const { movieId } = req.params;
  const {_id } = req.user;

  Movie.findByIdAndRemove(movieId)
    .then((movie) => {
      if (!movie) {
        return next(new NotFoundError('фильм с таким id не найдена'));
      }
      if (movie.owner.valueOf() !== _id) {
        return next(new ForbiddenError('нельзя удалить чужой фильм'));
      }
      return res.status(200).send({ movie });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('переданы невалидные данные карточки'));
      }
      return next(err);
    });

}

