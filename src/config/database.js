require('dotenv').config();

module.exports = {
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  dialect: process.env.DB_DIALECT,
  host: process.env.DB_HOST,
  url: process.env.DB_URL,
  port: process.env.DB_PORT,
};