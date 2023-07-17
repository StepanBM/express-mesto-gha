const Cards = require('../models/card');

const getCards = (req, res) => {
  Cards.find({})
    .then((cards) => {
      if (!cards) {
        return res.status(404).send({ message: 'Пользователь по указанному _id не найден' });
      }
      return res.status(200).send(cards);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({ message: 'Переданы некорректные данные' });
      }
      return res.status(500).send({ message: 'На сервере произошла ошибка' });
    });
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
        return res.status(400).send({ message: 'Переданы некорректные данные' });
      }
      return res.status(500).send({ message: 'На сервере произошла ошибка' });
    });
};

const removeCard = (req, res) => {
  const { cardId } = req.params;
  Cards.findByIdAndRemove(cardId)
    .then((data) => {
      if (!data) {
        res.status(404).send({ message: 'Карточки не существует' });
      }
      res.status(200).send(data);
    })
    .catch(() => res.status(400).send({ message: 'Переданы некорректные данные' }));
};

const addLikeCard = (req, res) => {
  const { cardId } = req.params;
  Cards.findByIdAndUpdate(cardId, { $addToSet: { likes: req.user._id } }, { new: true })
    .then((card) => {
      if (!card) {
        return res.status(404).send({ message: 'Карточка по указанному _id не найден' });
      }
      return res.status(200).send(card);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({ message: 'Переданы некорректные данные' });
      }
      if (err.name === 'CastError') {
        return res.status(400).send({ message: 'Карточка по указанному _id не найден' });
      }
      return res.status(500).send({ message: 'На сервере произошла ошибка' });
    });
};

const removeLikeCard = (req, res) => {
  const { cardId } = req.params;
  Cards.findByIdAndUpdate(cardId, { $pull: { likes: req.user._id } }, { new: true })
    .then((card) => {
      if (!card) {
        return res.status(400).send({ message: 'Пользователь по указанному _id не найден' });
      }
      return res.status(200).send(card);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({ message: 'Переданы некорректные данные' });
      }
      if (err.name === 'CastError') {
        return res.status(400).send({ message: 'Пользователь по указанному _id не найден' });
      }
      return res.status(500).send({ message: 'На сервере произошла ошибка' });
    });
};

module.exports = {
  getCards,
  addCard,
  removeCard,
  addLikeCard,
  removeLikeCard,
};
