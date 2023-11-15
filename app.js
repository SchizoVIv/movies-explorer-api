const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const helmet = require('helmet');
const { errors } = require('celebrate');
const cors = require('./middlewares/cors');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const handleErrors = require('./utils/handleErrors');
const router = require('./routes');
const { limit } = require('./middlewares/limiter');
const {
  NODE_ENV,
  PORT,
  DB,
  MY_DB,
} = require('./utils/config');

const app = express();
app.use(helmet());
app.use(cors);

mongoose.connect(NODE_ENV === 'production' ? DB : MY_DB, { useNewUrlParser: true });

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

dotenv.config();

app.use(cookieParser());
app.use(bodyParser.json());

app.use(requestLogger);
app.use(limit);

app.use(router);
app.use(errorLogger);

app.use(errors());
app.use(handleErrors);

app.listen(PORT);
