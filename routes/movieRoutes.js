const router = require('express').Router();
const {
  createMovie,
  getMovies,
  deleteMovie,
} = require('../controllers/controllersMovie');

const {
  createMovieValidation,
  movieIdValidation,
} = require('../middlewares/validations');
// возвращает все сохранённые фильмы
router.get('/movies', getMovies);
// создаёт фильм с переданными обязательными параметрами
router.post('/movies', createMovieValidation, createMovie);
// удаление сохранённого фильма по его Id
router.delete('/movies/:movieId', movieIdValidation, deleteMovie);

module.exports = router;
