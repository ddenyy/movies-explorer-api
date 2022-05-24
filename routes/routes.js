const router = require('express').Router();
const routesUser = require('./userRoutes');
const routesMovie = require('./movieRoutes');
const NotFoundError = require('../errors/NotFoundError');
const { createUser, loginUser } = require('../controllers/controllersUser');
const auth = require('../middlewares/auth');

router.post('/signup', createUser);
router.post('/signin', loginUser);

router.use(auth);
// тут защита авторизацией

router.use(routesUser);
// router.use(routesMovie);

// обработка некорректного машрута
router.use('*', (req, res, next) => {
  next(new NotFoundError('Страница не найдена'));
});

module.exports = router;