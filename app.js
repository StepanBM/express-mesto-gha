const express = require('express');

const mongoose = require('mongoose');

const bodyParser = require('body-parser');

const userRoutes = require('./routes/users');
const cardsRoutes = require('./routes/cards');

const { auth } = require('./middlewares/auth');

const { login, addUser } = require('./controllers/users');

const { validatorLogin, validatorAddUser } = require('./middlewares/validator');

const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/signin', validatorLogin, login);
app.post('/signup', validatorAddUser, addUser);

app.use(auth);

app.use('/users', userRoutes);
app.use('/cards', cardsRoutes);

app.use('', (req, res) => {
  res.status(404).send({ message: 'Данного пути не существует' });
});

app.use((error, req, res, next) => {
  console.log(`Произошла ошибка ${error.statusCode}, ${error.message}`);
  // Установка кода состояния ответа
  res.status(error.statusCode);

  // Отправка ответа
  res.json({ message: error.message });
  next();
});

app.listen(PORT, () => {
  // Если всё работает, консоль покажет, какой порт приложение слушает
  // console.log(`App listening on port ${PORT}`);
});
