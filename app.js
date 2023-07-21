const express = require('express');

const mongoose = require('mongoose');

const bodyParser = require('body-parser');

const { errors } = require('celebrate');

const userRoutes = require('./routes/users');
const cardsRoutes = require('./routes/cards');

const { auth } = require('./middlewares/auth');

const { login, addUser } = require('./controllers/users');

const { validatorLogin, validatorAddUser } = require('./middlewares/validator');

const serverError = require('./errors/ServerError');

const NotDataError = require('./errors/NotDataError');

const { PORT = 3000 } = process.env;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/signin', validatorLogin, login);
app.post('/signup', validatorAddUser, addUser);

app.use(auth);
app.use('/users', userRoutes);
app.use('/cards', cardsRoutes);
app.use(errors());
app.use('', (req, res, next) => {
  next(new NotDataError('Данного пути не существует'));
});
app.use(serverError);

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
});

app.listen(PORT, () => {
  // Если всё работает, консоль покажет, какой порт приложение слушает
  // console.log(`App listening on port ${PORT}`);
});
