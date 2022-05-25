const router = require('express').Router();
const {
  createMovie,
  getMovies,
  deleteMovie,
} = require('../controllers/controllersMovie');
// // возвращает все сохранённые фильмы
 router.get('/movies', getMovies);
// // создаёт фильм с переданными обязательными параметрами
// // country, director, duration, year, description, image, trailer, nameRU, nameEN и thumbnail, movieId
 router.post('/movies', createMovie);
// //удаление сохранённого фильма по его Id
 router.delete('/movies/:movieId', deleteMovie);

module.exports = router;