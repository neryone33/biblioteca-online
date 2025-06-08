const express = require('express');
const router = express.Router();

// Importação das rotas
const authRoutes = require('./authRoutes');
const livroRoutes = require('./livroRoutes');
const categoriaRoutes = require('./categoriaRoutes');
const usuarioRoutes = require('./usuarioRoutes');
const emprestimoRoutes = require('./emprestimoRoutes');

// Definição das rotas
router.use('/auth', authRoutes); // Novas rotas de autenticação
router.use('/livros', livroRoutes);
router.use('/categorias', categoriaRoutes);
router.use('/usuarios', usuarioRoutes);
router.use('/emprestimos', emprestimoRoutes);

module.exports = router;
