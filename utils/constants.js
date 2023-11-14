const ERR_BAD_REQUEST = 400;
const ERR_UNAUTHORIZED = 401;
const ERR_FORBIDDEN = 403;
const ERR_NOT_FOUND = 404;
const ERR_CONFLICT = 409;
const ERR_INTERNAL_SERVER = 500;

const STATUS_OK = 200;
const STATUS_CREATED = 201;

const TEXT_GET_MOVIE = 'Список сохраненных фильмов:';
const TEXT_OUT = 'Вы вышли из своего аккаунта';
const TEXT_DELETE = 'Фильм удален из избранного';

const ERR_TEXT_404 = 'Ошибка 404. Страница не найдена';
const ERR_TEXT_BAD_PROFILE = 'Переданы некорректные данные при обновлении профиля';
const ERR_TEXT_NOTFOUND = 'Пользователь не найден';
const ERR_TEXT_BAD_CREDENTIALS = 'Переданы некорректные данные при регистрации пользователя';
const ERR_TEXT_NO_CREDENTIALS = 'Не указан логин или пароль';
const ERR_TEXT_NO_USER = 'Такого пользователя не существует';
const ERR_TEXT_BAD_LOGIN = 'Неверный логин или пароль';
const ERR_TEXT_BAD_OUT = 'Неверные данные авторизации';

const ERR_TEXT_BAD_CREATE_MOVIE = 'Переданы некорректные данные при создании фильма';
const ERR_TEXT_BAD_DEL_MOVIE = 'Переданы некорректные данные при удалении фильма';
const ERR_TEXT_NO_MOVIE = 'Фильма с таким ID не найдено';
const ERR_TEXT_ELSE_MOVIE = 'Удаление чужих фильмов - запрещено';
const ERR_TEXT_NO_AUTH = 'Вы не авторизированы';
const ERR_TEXT_NO_TOKEN = 'Токен отсутствует';

const MONGO_PATTERN = /^[0-9a-fA-F]{24}$/;
const URI_PATTERN = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/i;

const SOLT_ROUNDS = 10;

module.exports = {
  STATUS_CREATED,
  STATUS_OK,
  ERR_BAD_REQUEST,
  ERR_UNAUTHORIZED,
  ERR_FORBIDDEN,
  ERR_NOT_FOUND,
  ERR_CONFLICT,
  ERR_INTERNAL_SERVER,
  ERR_TEXT_404,
  ERR_TEXT_BAD_PROFILE,
  ERR_TEXT_NOTFOUND,
  ERR_TEXT_BAD_CREDENTIALS,
  ERR_TEXT_NO_CREDENTIALS,
  ERR_TEXT_NO_USER,
  ERR_TEXT_BAD_LOGIN,
  ERR_TEXT_BAD_OUT,
  TEXT_OUT,
  ERR_TEXT_BAD_CREATE_MOVIE,
  ERR_TEXT_BAD_DEL_MOVIE,
  ERR_TEXT_NO_MOVIE,
  TEXT_DELETE,
  TEXT_GET_MOVIE,
  ERR_TEXT_ELSE_MOVIE,
  ERR_TEXT_NO_AUTH,
  ERR_TEXT_NO_TOKEN,
  MONGO_PATTERN,
  URI_PATTERN,
  SOLT_ROUNDS,
};
