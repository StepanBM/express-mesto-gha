const Cards = require('../models/card');

const { INCORRECT_DATA, NOT_DATA, SERVER_ERROR } = require('../utils/constants');

const getCards = (req, res) => {
  Cards.find({})
    .then((cards) => res.status(200).send(cards))
    .catch(() => res.status(SERVER_ERROR).send({ message: 'На сервере произошла ошибка' }));
};

const addCard = (req, res) => {
  const card = {
    name: req.body.name,
    link: req.body.link,
    owner: req.user._id,
  };
  Cards.create(card)
    .then((data) => res.status(200).send(data))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(INCORRECT_DATA).send({ message: 'Переданы некорректные данные' });
      }
      return res.status(SERVER_ERROR).send({ message: 'На сервере произошла ошибка' });
    });
};

const removeCard = (req, res) => {
  const { cardId } = req.params;
  Cards.findByIdAndRemove(cardId)
    .then((data) => {
      if (!data) {
        return res.status(NOT_DATA).send({ message: 'Карточки не существует' });
      }
      return res.status(200).send(data);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(INCORRECT_DATA).send({ message: 'Некорректный _id' });
      }
      return res.status(SERVER_ERROR).send({ message: 'На сервере произошла ошибка' });
    });
};

const addLikeCard = (req, res) => {
  const { cardId } = req.params;
  Cards.findByIdAndUpdate(cardId, { $addToSet: { likes: req.user._id } }, { new: true })
    .then((card) => {
      if (!card) {
        return res.status(NOT_DATA).send({ message: 'Карточка по указанному _id не найден' });
      }
      return res.status(200).send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(INCORRECT_DATA).send({ message: 'Некорректный _id' });
      }
      return res.status(SERVER_ERROR).send({ message: 'На сервере произошла ошибка' });
    });
};

const removeLikeCard = (req, res) => {
  const { cardId } = req.params;
  Cards.findByIdAndUpdate(cardId, { $pull: { likes: req.user._id } }, { new: true })
    .then((card) => {
      if (!card) {
        return res.status(NOT_DATA).send({ message: 'Карточка по указанному _id не найден' });
      }
      return res.status(200).send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(INCORRECT_DATA).send({ message: 'Некорректный _id' });
      }
      return res.status(SERVER_ERROR).send({ message: 'На сервере произошла ошибка' });
    });
};

module.exports = {
  getCards,
  addCard,
  removeCard,
  addLikeCard,
  removeLikeCard,
};
