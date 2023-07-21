const router = require('express').Router();
const {
  getUsersAll,
  getUser,
  updateUserInfo,
  updateUserAvatar,
  getUserMe,
} = require('../controllers/users');

const {
  validatorUpdateUser,
  validatorUpdateAvatar,
  validatorUserId,
} = require('../middlewares/validator');

router.get('/', getUsersAll);
router.patch('/me/avatar', validatorUpdateAvatar, updateUserAvatar);
router.get('/me', getUserMe);
router.patch('/me', validatorUpdateUser, updateUserInfo);
router.get('/:userId', validatorUserId, getUser);
module.exports = router;
