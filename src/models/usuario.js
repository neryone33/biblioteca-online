const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const bcrypt = require('bcryptjs');

const Usuario = sequelize.define('Usuario', {
  // --- INÍCIO DA DEFINIÇÃO DOS ATRIBUTOS ---
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nome: { // <-- Provavelmente estava faltando
    type: DataTypes.STRING(100),
    allowNull: false
  },
  email: { // <-- Provavelmente estava faltando
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true
  },
  senha: {
    type: DataTypes.STRING,
    allowNull: false
  },
  tipo_usuario: { // <-- Provavelmente estava faltando
    type: DataTypes.ENUM('estudante', 'professor', 'administrador'),
    allowNull: false
  },
  data_cadastro: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
  // --- FIM DA DEFINIÇÃO DOS ATRIBUTOS ---
}, {
  tableName: 'Usuarios',
  timestamps: false,
  hooks: {
    beforeCreate: async (usuario) => {
      if (usuario.senha) {
        const salt = await bcrypt.genSalt(10);
        usuario.senha = await bcrypt.hash(usuario.senha, salt);
      }
    }
    // Opcional: Hook de beforeUpdate se você permitir a atualização de senha
    // beforeUpdate: async (usuario) => {
    //   if (usuario.changed('senha')) {
    //     const salt = await bcrypt.genSalt(10);
    //     usuario.senha = await bcrypt.hash(usuario.senha, salt);
    //   }
    // }
  }
});

// Método para comparar senhas (se você o tiver em outro lugar, tudo bem)
Usuario.prototype.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.senha);
};

module.exports = Usuario;
