const { Livro, Categoria } = require('../models');

const livroController = {
  // Criar novo livro
  async criar(req, res) {
    try {
      const livro = await Livro.create(req.body);
      res.status(201).json(livro);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // Listar todos os livros
  async listar(req, res) {
    try {
      const livros = await Livro.findAll({
        include: [{ model: Categoria }]
      });
      res.json(livros);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Buscar livro por ID
  async buscarPorId(req, res) {
    try {
      const livro = await Livro.findByPk(req.params.id, {
        include: [{ model: Categoria }]
      });
      
      if (!livro) {
        return res.status(404).json({ error: 'Livro não encontrado' });
      }
      
      res.json(livro);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Atualizar livro
  async atualizar(req, res) {
    try {
      const [updated] = await Livro.update(req.body, {
        where: { id: req.params.id }
      });
      
      if (updated) {
        const livro = await Livro.findByPk(req.params.id, {
          include: [{ model: Categoria }]
        });
        res.json(livro);
      } else {
        res.status(404).json({ error: 'Livro não encontrado' });
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // Deletar livro
  async deletar(req, res) {
    try {
      const deleted = await Livro.destroy({
        where: { id: req.params.id }
      });
      
      if (deleted) {
        res.status(204).send();
      } else {
        res.status(404).json({ error: 'Livro não encontrado' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = livroController;
