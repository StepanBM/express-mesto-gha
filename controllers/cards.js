const Cards = require('../models/card');

const getCards = (req, res) => {
  Cards.find({})
    .then((cards) => res.status(200).send(cards))
    .catch(() => res.status(500).send({ message: 'На сервере произошла ошибка' }));
};

const addCard = (req, res) => {
  if (!req.body.name || !req.body.link) {
    res.status(400).send({ message: 'Нет нужных полей' });
    return;
  }
  const card = {
    name: req.body.name,
    link: req.body.link,
    owner: req.user._id,
  };
  Cards.create(card)
    .then(() => res.status(200).send())
    .catch(() => res.status(500).send({ message: 'На сервере произошла ошибка' }));
};

const removeCard = (req, res) => {
  const { cardId } = req.params;
  Cards.findByIdAndRemove(cardId)
    .then(() => res.status(200).send())
    .catch(() => res.status(404).send({ message: 'Карточки не существует' }));
};
const addLikeCard = (req, res) => {
  const { cardId } = req.params;
  Cards.findByIdAndUpdate(cardId, { $addToSet: { likes: req.user._id } }, { new: true })
    .then(() => res.status(200).send())
    .catch(() => res.status(404).send({ message: 'Карточки не существует' }));
};

const removeLikeCard = (req, res) => {
  const { cardId } = req.params;
  Cards.findByIdAndUpdate(cardId, { $pull: { likes: req.user._id } }, { new: true })
    .then(() => res.status(200).send())
    .catch(() => res.status(404).send({ message: 'Карточки не существует' }));
};

module.exports = {
  getCards,
  addCard,
  removeCard,
  addLikeCard,
  removeLikeCard,
};
