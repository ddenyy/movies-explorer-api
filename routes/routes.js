const router = require('express').Router();
const routesUser = require('./userRoutes');
const routesMovie = require('./movieRoutes');
const NotFoundError = require('../errors/NotFoundError');
const { createUser, login } = require('../controllers/controllersUser');
const auth = require('../middlewares/auth');
const {
  signUpValidation,
  signInValidation,
} = require('../middlewares/validations');

router.post('/signup', signUpValidation, createUser);
router.post('/signin', signInValidation, login);

router.use(auth);
// тут защита авторизацией

router.use(routesUser);
router.use(routesMovie);

// обработка некорректного машрута
router.use('*', (req, res, next) => {
  next(new NotFoundError('Страница не найдена'));
});

module.exports = router;
