const mysql = require('mysql2/promise');
const fs = require('fs').promises;
const path = require('path');
// Garante que o .env no diretório raiz do projeto seja carregado
require('dotenv').config({ path: path.join(__dirname, '../.env') });

async function setupDatabase() {
  let connection;
  
  // Lista de scripts a serem executados na ordem correta
  const scripts = [
    'create-database.sql',
    'insert-data.sql',  
    'views.sql',
    'procedures-triggers.sql'
  ];

  try {
    // Conectar ao MySQL (sem especificar a database)
    connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      port: process.env.DB_PORT,
      multipleStatements: true // Essencial para executar arquivos com múltiplos comandos
    });

    console.log('✅ Conectado ao MySQL com sucesso.');

    // Loop para executar cada script
    for (const scriptFile of scripts) {
      console.log(`Executando o script: ${scriptFile}...`);
      const scriptPath = path.join(__dirname, scriptFile);
      const scriptSQL = await fs.readFile(scriptPath, 'utf8');
      
      await connection.query(scriptSQL);
      
      console.log(`✅ Script ${scriptFile} executado com sucesso.`);
    }

    console.log('\n🎉 Banco de dados completamente configurado!');

  } catch (error) {
    console.error(`❌ Erro ao configurar banco de dados durante a execução de '${error.script || 'etapa desconhecida'}':`, error);
    // Adiciona o nome do script ao erro para facilitar a depuração
    if (error.config && error.config.scriptFile) {
      error.script = error.config.scriptFile;
    }
  } finally {
    if (connection) {
      await connection.end();
      console.log('Conexão com o MySQL fechada.');
    }
  }
}

setupDatabase();
