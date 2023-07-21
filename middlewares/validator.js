const { celebrate, Joi } = require('celebrate');

const validatorLogin = celebrate({
  body: Joi.object().keys({
    email:
    Joi.string().required().email(),
    password:
    Joi.string().required(),
  }),
});

const validatorAddUser = celebrate({
  body: Joi.object().keys({
    name:
    Joi.string().min(2).max(30),
    about:
    Joi.string().min(2).max(30),
    avatar:
    Joi.string().regex(/(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/),
    email:
    Joi.string().required().email(),
    password:
    Joi.string(),
  }),
});

const validatorUpdateUser = celebrate({
  body: Joi.object().keys({
    name:
    Joi.string().min(2).max(30).required(),
    about:
    Joi.string().min(2).max(30).required(),
  }),
});

const validatorUpdateAvatar = celebrate({
  body: Joi.object().keys({
    avatar:
    Joi.string().required().regex(/(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/),
  }),
});

const validatorUserId = celebrate({
  params: Joi.object().keys({
    userId:
    Joi.string().required().length(24).uuid(),
  }),
});

const validatorCardId = celebrate({
  params: Joi.object().keys({
    cardId:
    Joi.string().required().length(24),
  }),
});

const validatorAddCard = celebrate({
  body: Joi.object().keys({
    name:
    Joi.string().min(2).max(30).required(),
    link:
    Joi.string().required().uri(),
  }),
});

module.exports = {
  validatorLogin,
  validatorAddUser,
  validatorUpdateUser,
  validatorUpdateAvatar,
  validatorUserId,
  validatorCardId,
  validatorAddCard,
};
