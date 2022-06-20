const router = require('express').Router();
const { getCurrentUser, updateUserData } = require('../controllers/controllersUser');
const { updateUserValidation } = require('../middlewares/validations');
// получение текущей информации о пользователе
router.get('/users/me', getCurrentUser);
// обновление информации о текущем пользователе
router.patch('/users/me', updateUserValidation, updateUserData);

module.exports = router;
