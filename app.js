const express = require('express');
const mongoose = require('mongoose');
const router = require('./routes/routes');
const errorHandler = require('./middlewares/errorHandler');
// Слушаем 3000 порт
const { PORT = 3000 } = process.env;

const app = express();

// подключаем обработку приходящих данных
app.use(express.json());

// подключение к БД
mongoose.connect('mongodb://localhost:27017/bitfilmsdb');

app.listen(PORT);

app.use(router);
//подключаем центролизованную обработку ошибок
app.use(errorHandler);
