const express = require('express');
const cors = require('cors');
require('dotenv').config();

const sequelize = require('./config/database');
const routes = require('./routes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Rotas
app.use('/api', routes);

// Rota de teste
app.get('/', (req, res) => {
  res.json({ message: 'API da Biblioteca Online funcionando!' });
});

// Inicializar servidor
async function iniciarServidor() {
  try {
    // Testar conexão com o banco
    await sequelize.authenticate();
    console.log('Conexão com o banco de dados estabelecida com sucesso.');
    
    // Sincronizar modelos (apenas para desenvolvimento)
    // await sequelize.sync({ force: false });
    
    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  } catch (error) {
    console.error('Erro ao conectar com o banco de dados:', error);
  }
}

iniciarServidor();
