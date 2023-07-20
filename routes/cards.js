const router = require('express').Router();
const {
  getCards,
  addCard,
  removeCard,
  addLikeCard,
  removeLikeCard,
} = require('../controllers/cards');

const {
  validatorCardId,
  validatorAddCard,
} = require('../middlewares/validator');

router.get('/', getCards);
router.post('/', validatorAddCard, addCard);
router.delete('/:cardId', validatorCardId, removeCard);
router.put('/:cardId/likes', validatorCardId, addLikeCard);
router.delete('/:cardId/likes', validatorCardId, removeLikeCard);

module.exports = router;
