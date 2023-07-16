const router = require('express').Router();
const {
  getCards,
  addCard,
  removeCard,
  addLikeCard,
  removeLikeCard,
} = require('../controllers/cards');

router.get('/', getCards);
router.post('/', addCard);
router.delete('/:cardId', removeCard);
router.put('/:cardId/likes', addLikeCard);
router.delete('/:cardId/likes', removeLikeCard);

module.exports = router;
