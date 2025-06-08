const jwt = require('jsonwebtoken');
const { Usuario } = require('../models');

const protect = async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      req.user = await Usuario.findByPk(decoded.id, {
        attributes: { exclude: ['senha'] }
      });
      
      if (!req.user) {
        return res.status(401).json({ error: 'Usuário não encontrado' });
      }
      
      next();
    } catch (error) {
      res.status(401).json({ error: 'Não autorizado, token inválido' });
    }
  }

  if (!token) {
    res.status(401).json({ error: 'Não autorizado, sem token' });
  }
};

const admin = (req, res, next) => {
  if (req.user && req.user.tipo_usuario === 'administrador') {
    next();
  } else {
    res.status(403).json({ error: 'Acesso negado. Rota apenas para administradores.' });
  }
};

module.exports = { protect, admin };
