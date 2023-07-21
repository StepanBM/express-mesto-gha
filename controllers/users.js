const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const NotDataError = require('../errors/NotDataError');
const IncorrectDataError = require('../errors/IncorrectDataError');
const EmailExistsError = require('../errors/EmailExistsError');

const getUsersAll = (req, res, next) => {
  User.find({})
    .then((users) => res.status(200).send(users))
    .catch(next);
};

const getUserMe = (req, res, next) => {
  const userId = req.user._id;
  console.log(userId);
  User.findById(userId)
    .then((user) => {
      if (!user) {
        throw new NotDataError('Пользователь по указанному _id не найден');
      }
      return res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        throw new IncorrectDataError('Некорректный _id');
      }
    })
    .catch(next);
};

const addUser = (req, res, next) => {
  const user = {
    name: req.body.name,
    about: req.body.about,
    avatar: req.body.avatar,
    email: req.body.email,
    password: req.body.password,
  };
  bcrypt.hash(user.password, 10)
    .then((hash) => {
      user.password = hash;
      User.create(user)
        .then((data) => res.status(200).send(data))
        .catch((err) => {
          if (err.name === 'ValidationError') {
            next(new IncorrectDataError('Переданы некорректные данные'));
          } else if (err.code === 11000) {
            next(new EmailExistsError('Пользователь с таким email уже существует'));
          }
        });
    })
    .catch(next);
};

const getUser = (req, res, next) => {
  const { userId } = req.params;
  User.findById(userId)
    .then((user) => {
      if (!user) {
        next(new NotDataError('Пользователь по указанному _id не найден'));
      }
      return res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new IncorrectDataError('Некорректный _id'));
      }
    })
    .catch(next);
};

const updateUserInfo = (req, res, next) => {
  const userInfo = {
    name: req.body.name,
    about: req.body.about,
  };
  User.findByIdAndUpdate(req.user._id, userInfo, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        throw new NotDataError('Пользователь по указанному _id не найден');
      }
      return res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new IncorrectDataError('Переданы некорректные данные');
      }
    })
    .catch(next);
};

const updateUserAvatar = (req, res, next) => {
  const userAvatar = {
    avatar: req.body.avatar,
  };
  User.findByIdAndUpdate(req.user._id, userAvatar, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        throw new NotDataError('Пользователь по указанному _id не найден');
      }
      return res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new IncorrectDataError('Переданы некорректные данные');
      }
    })
    .catch(next);
};

const login = (req, res) => {
  const { email, password } = req.body;

  User.findUserByCredentials(email, password)
    .then((check) => {
      if (check) {
      // Создадим токен
        User.findOne({ email })
          .then((user) => {
            const token = jwt.sign({ _id: user._id }, 'some-secret-key', { expiresIn: '7d' });
            // Вернём токен
            res.status(200).send({ token });
          });
      } else {
        res.status(401).send({ message: 'Некорректные данные' });
      }
    })
    .catch(() => {
      res.status(401).send({ message: 'Некорректные данные' });
    });
};

module.exports = {
  getUsersAll,
  addUser,
  getUser,
  updateUserInfo,
  updateUserAvatar,
  login,
  getUserMe,
};
