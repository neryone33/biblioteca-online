const express = require('express');
const router = express.Router();
const emprestimoController = require('../controllers/emprestimoController');

router.post('/', emprestimoController.criar);
router.get('/', emprestimoController.listar);
router.get('/ativos', emprestimoController.listarAtivos);
router.get('/atrasados', emprestimoController.listarAtrasados);
router.get('/:id', emprestimoController.buscarPorId);
router.put('/:id/devolver', emprestimoController.devolver);

module.exports = router;
