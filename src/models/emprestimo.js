const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Emprestimo = sequelize.define('Emprestimo', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  usuario_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Usuarios',
      key: 'id'
    }
  },
  livro_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Livros',
      key: 'id'
    }
  },
  data_emprestimo: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  data_devolucao_prevista: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  data_devolucao_efetiva: {
    type: DataTypes.DATEONLY,
    allowNull: true
  },
  status_emprestimo: {
    type: DataTypes.ENUM('ativo', 'devolvido', 'atrasado'),
    defaultValue: 'ativo'
  }
}, {
  tableName: 'Emprestimos',
  timestamps: false
});

module.exports = Emprestimo;
