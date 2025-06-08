const { Usuario, Emprestimo, Livro } = require('../models');

const usuarioController = {
  async criar(req, res) {
    try {
      const usuario = await Usuario.create(req.body);
      res.status(201).json(usuario);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async listar(req, res) {
    try {
      const usuarios = await Usuario.findAll({
        include: [{
          model: Emprestimo,
          include: [{ model: Livro }]
        }]
      });
      res.json(usuarios);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async buscarPorId(req, res) {
    try {
      const usuario = await Usuario.findByPk(req.params.id, {
        include: [{
          model: Emprestimo,
          include: [{ model: Livro }]
        }]
      });
      
      if (!usuario) {
        return res.status(404).json({ error: 'Usuário não encontrado' });
      }
      
      res.json(usuario);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async atualizar(req, res) {
    try {
      const [updated] = await Usuario.update(req.body, {
        where: { id: req.params.id }
      });
      
      if (updated) {
        const usuario = await Usuario.findByPk(req.params.id);
        res.json(usuario);
      } else {
        res.status(404).json({ error: 'Usuário não encontrado' });
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async deletar(req, res) {
    try {
      const deleted = await Usuario.destroy({
        where: { id: req.params.id }
      });
      
      if (deleted) {
        res.status(204).send();
      } else {
        res.status(404).json({ error: 'Usuário não encontrado' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = usuarioController;
