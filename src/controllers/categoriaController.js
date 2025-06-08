const { Categoria, Livro } = require('../models');

const categoriaController = {
  async criar(req, res) {
    try {
      const categoria = await Categoria.create(req.body);
      res.status(201).json(categoria);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async listar(req, res) {
    try {
      const categorias = await Categoria.findAll({
        include: [{ model: Livro }]
      });
      res.json(categorias);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async buscarPorId(req, res) {
    try {
      const categoria = await Categoria.findByPk(req.params.id, {
        include: [{ model: Livro }]
      });
      
      if (!categoria) {
        return res.status(404).json({ error: 'Categoria não encontrada' });
      }
      
      res.json(categoria);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async atualizar(req, res) {
    try {
      const [updated] = await Categoria.update(req.body, {
        where: { id: req.params.id }
      });
      
      if (updated) {
        const categoria = await Categoria.findByPk(req.params.id);
        res.json(categoria);
      } else {
        res.status(404).json({ error: 'Categoria não encontrada' });
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async deletar(req, res) {
    try {
      const deleted = await Categoria.destroy({
        where: { id: req.params.id }
      });
      
      if (deleted) {
        res.status(204).send();
      } else {
        res.status(404).json({ error: 'Categoria não encontrada' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = categoriaController;
