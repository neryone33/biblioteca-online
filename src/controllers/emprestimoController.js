const { Emprestimo, Usuario, Livro, Categoria } = require('../models');
const sequelize = require('../config/database');

const emprestimoController = {
  async criar(req, res) {
    try {
      // Verificar disponibilidade do livro antes de criar empréstimo
      const livro = await Livro.findByPk(req.body.livro_id);
      
      if (!livro || livro.quantidade_disponivel <= 0) {
        return res.status(400).json({ error: 'Livro não disponível para empréstimo' });
      }

      // Usar transação para garantir consistência
      const result = await sequelize.transaction(async (t) => {
        // Criar empréstimo
        const emprestimo = await Emprestimo.create(req.body, { transaction: t });
        
        // Atualizar quantidade disponível
        await Livro.update(
          { quantidade_disponivel: livro.quantidade_disponivel - 1 },
          { where: { id: req.body.livro_id }, transaction: t }
        );

        return emprestimo;
      });

      const emprestimoCompleto = await Emprestimo.findByPk(result.id, {
        include: [
          { model: Usuario },
          { 
            model: Livro,
            include: [{ model: Categoria }]
          }
        ]
      });

      res.status(201).json(emprestimoCompleto);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async listar(req, res) {
    try {
      const emprestimos = await Emprestimo.findAll({
        include: [
          { model: Usuario },
          { 
            model: Livro,
            include: [{ model: Categoria }]
          }
        ],
        order: [['data_emprestimo', 'DESC']]
      });
      res.json(emprestimos);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async buscarPorId(req, res) {
    try {
      const emprestimo = await Emprestimo.findByPk(req.params.id, {
        include: [
          { model: Usuario },
          { 
            model: Livro,
            include: [{ model: Categoria }]
          }
        ]
      });
      
      if (!emprestimo) {
        return res.status(404).json({ error: 'Empréstimo não encontrado' });
      }
      
      res.json(emprestimo);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async devolver(req, res) {
    try {
      const emprestimo = await Emprestimo.findByPk(req.params.id);
      
      if (!emprestimo) {
        return res.status(404).json({ error: 'Empréstimo não encontrado' });
      }

      if (emprestimo.status_emprestimo === 'devolvido') {
        return res.status(400).json({ error: 'Livro já foi devolvido' });
      }

      // Usar transação para garantir consistência
      await sequelize.transaction(async (t) => {
        // Atualizar status do empréstimo
        await Emprestimo.update(
          { 
            status_emprestimo: 'devolvido',
            data_devolucao_efetiva: new Date()
          },
          { where: { id: req.params.id }, transaction: t }
        );
        
        // Atualizar quantidade disponível do livro
        await Livro.increment(
          'quantidade_disponivel',
          { where: { id: emprestimo.livro_id }, transaction: t }
        );
      });

      const emprestimoAtualizado = await Emprestimo.findByPk(req.params.id, {
        include: [
          { model: Usuario },
          { 
            model: Livro,
            include: [{ model: Categoria }]
          }
        ]
      });

      res.json(emprestimoAtualizado);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async listarAtivos(req, res) {
    try {
      const emprestimosAtivos = await Emprestimo.findAll({
        where: { status_emprestimo: 'ativo' },
        include: [
          { model: Usuario },
          { 
            model: Livro,
            include: [{ model: Categoria }]
          }
        ],
        order: [['data_emprestimo', 'DESC']]
      });
      res.json(emprestimosAtivos);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async listarAtrasados(req, res) {
    try {
      const emprestimosAtrasados = await Emprestimo.findAll({
        where: {
          status_emprestimo: 'ativo',
          data_devolucao_prevista: {
            [sequelize.Sequelize.Op.lt]: new Date()
          }
        },
        include: [
          { model: Usuario },
          { 
            model: Livro,
            include: [{ model: Categoria }]
          }
        ],
        order: [['data_devolucao_prevista', 'ASC']]
      });
      res.json(emprestimosAtrasados);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = emprestimoController;
