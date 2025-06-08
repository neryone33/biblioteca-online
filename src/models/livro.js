const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Livro = sequelize.define('Livro', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  titulo: {
    type: DataTypes.STRING(200),
    allowNull: false
  },
  autor: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  isbn: {
    type: DataTypes.STRING(20),
    unique: true
  },
  categoria_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Categorias',
      key: 'id'
    }
  },
  quantidade_total: {
    type: DataTypes.INTEGER,
    defaultValue: 1
  },
  quantidade_disponivel: {
    type: DataTypes.INTEGER,
    defaultValue: 1
  },
  data_publicacao: {
    type: DataTypes.DATEONLY
  },
  editora: {
    type: DataTypes.STRING(100)
  }
}, {
  tableName: 'Livros',
  timestamps: false
});

module.exports = Livro;
