const router = require('express').Router();
const {
  getUsersAll,
  addUser,
  getUser,
  updateUserInfo,
  updateUserAvatar,
} = require('../controllers/users');

router.get('/', getUsersAll);
router.post('/', addUser);
router.get('/:userId', getUser);
router.patch('/me', updateUserInfo);
router.patch('/me/avatar', updateUserAvatar);
module.exports = router;
