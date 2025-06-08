const Usuario = require('./usuario');
const Categoria = require('./categoria');
const Livro = require('./livro');
const Emprestimo = require('./emprestimo');

// Definir associações
Categoria.hasMany(Livro, { foreignKey: 'categoria_id' });
Livro.belongsTo(Categoria, { foreignKey: 'categoria_id' });

Usuario.hasMany(Emprestimo, { foreignKey: 'usuario_id' });
Emprestimo.belongsTo(Usuario, { foreignKey: 'usuario_id' });

Livro.hasMany(Emprestimo, { foreignKey: 'livro_id' });
Emprestimo.belongsTo(Livro, { foreignKey: 'livro_id' });

module.exports = {
  Usuario,
  Categoria,
  Livro,
  Emprestimo
};
