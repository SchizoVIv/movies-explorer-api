const {
  NODE_ENV,
  PORT = 3000,
  DB,
  JWT_SECRET,
} = process.env;

const MY_DB = 'mongodb://127.0.0.1:27017/bitfilmsdb';
const JWT_SECRET_DEV = 'dev-secret-key';

module.exports = {
  NODE_ENV,
  PORT,
  DB,
  JWT_SECRET,
  MY_DB,
  JWT_SECRET_DEV,
};
