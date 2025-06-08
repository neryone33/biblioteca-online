const { Usuario } = require('../models');
const jwt = require('jsonwebtoken');

// Função para gerar o token (assumindo que ela existe no seu arquivo)
const generateToken = (id, tipo_usuario) => {
  return jwt.sign({ id, tipo_usuario }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '1d'
  });
};

const authController = {
  async register(req, res) {
    try {
      // 1. Recebe todos os dados do corpo da requisição
      const { nome, email, senha, tipo_usuario } = req.body;

      // 2. Garante que todos os campos foram recebidos antes de prosseguir
      if (!nome || !email || !senha || !tipo_usuario) {
        return res.status(400).json({ error: 'Todos os campos são obrigatórios: nome, email, senha, tipo_usuario.' });
      }

      // 3. Passa o objeto COMPLETO para o Usuario.create()
      // O hook 'beforeCreate' no seu modelo 'usuario.js' cuidará de hashear a senha automaticamente.
      const usuario = await Usuario.create({
        nome,
        email,
        senha,
        tipo_usuario
      });

      // 4. Gera o token
      const token = generateToken(usuario.id, usuario.tipo_usuario);
      
      // 5. Prepara a resposta, removendo a senha
      const usuarioResult = usuario.toJSON();
      delete usuarioResult.senha;

      // 6. Envia a resposta de sucesso
      res.status(201).json({ usuario: usuarioResult, token });

    } catch (error) {
      // Captura erros, como email duplicado (unique constraint)
      console.error('ERRO NO REGISTRO:', error);
      res.status(400).json({ 
        error: 'Não foi possível registrar o usuário.',
        details: error.message 
      });
    }
  },

  async login(req, res) {
    try {
      const { email, senha } = req.body;
      if (!email || !senha) {
        return res.status(400).json({ error: 'Por favor, forneça email e senha' });
      }

      const usuario = await Usuario.findOne({ where: { email } });

      if (!usuario || !(await usuario.comparePassword(senha))) {
        return res.status(401).json({ error: 'Email ou senha inválidos' });
      }

      const token = generateToken(usuario.id, usuario.tipo_usuario);

      const usuarioResult = usuario.toJSON();
      delete usuarioResult.senha;

      res.status(200).json({ usuario: usuarioResult, token });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = authController;
