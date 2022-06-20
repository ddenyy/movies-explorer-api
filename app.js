require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const { errors } = require('celebrate');
const errorHandler = require('./middlewares/errorHandler');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const limiter = require('./middlewares/limiter');
const router = require('./routes/routes');
const { developDataBaseUrl } = require('./utils/config');
// Слушаем 3000 порт
const { PORT = 3000, NODE_ENV, DATA_BASE_URL } = process.env;

const app = express();

// подключаем обработку приходящих данных
app.use(express.json());

// подключение к БД
mongoose.connect(NODE_ENV === 'production' ? DATA_BASE_URL : developDataBaseUrl);

app.listen(PORT);

const corsOptions = {
// только с источника http://localhost:3000 разрешены запросы
  origin: ['http://localhost:3000', 'https://localhost:3000'],
};

// включаем валидацию запросов чтоб проходить проверку cors
app.use(cors(corsOptions));
// настраиваем заголовки
app.use(helmet());
// подключаем логгер запросов
app.use(requestLogger);
// подключение лимитера
app.use(limiter);
// подключаем все роуты
app.use(router);
// подключаем логирование ошибок
app.use(errorLogger);

// обработка ошибок joi
app.use(errors());
// подключаем центролизованную обработку ошибок
app.use(errorHandler);
