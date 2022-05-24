const router = require('express').Router();
const { getCurrentUser, updateUserData } = require('../controllers/controllersUser');

// получение текущей информации о пользователе
router.get('/users/me', getCurrentUser);
// обновление информации о текущем пользователе
router.patch('/users/me', updateUserData);

module.exports = router;