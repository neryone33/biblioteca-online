const express = require('express');
const router = express.Router();
const livroController = require('../controllers/livroController');
const { protect, admin } = require('../middlewares/authMiddleware');

// Rotas públicas
router.get('/', livroController.listar);
router.get('/:id', livroController.buscarPorId);

// Rotas protegidas para administradores
router.post('/', protect, admin, livroController.criar);
router.put('/:id', protect, admin, livroController.atualizar);
router.delete('/:id', protect, admin, livroController.deletar);

module.exports = router;
