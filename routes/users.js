const router = require('express').Router();
const {
  getUsersAll,
  addUser,
  getUser,
  updateUserInfo,
  updateUserAvatar,
  getUserMe,
} = require('../controllers/users');

const {
  validatorAddUser,
  validatorUpdateUser,
  validatorUpdateAvatar,
  validatorUserId,
} = require('../middlewares/validator');

router.get('/', getUsersAll);
router.post('/', validatorAddUser, addUser);
router.patch('/me/avatar', validatorUpdateAvatar, updateUserAvatar);
router.get('/me', getUserMe);
router.patch('/me', validatorUpdateUser, updateUserInfo);
router.get('/:userId', validatorUserId, getUser);
module.exports = router;
