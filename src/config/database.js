const { Sequelize } = require('sequelize');
require('dotenv').config();

// Objeto base da configuração
const config = {
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  dialect: 'mysql',
  logging: false,
};

// Adiciona opções SSL apenas se estiver em ambiente de produção
if (process.env.NODE_ENV === 'production') {
  config.dialectOptions = {
    ssl: {
      // Altere esta linha de 'true' para 'false'
      rejectUnauthorized: false,
    }
  };
}

const sequelize = new Sequelize(config);

module.exports = sequelize;
