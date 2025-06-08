-- Criação do banco de dados (já verifica se existe)
CREATE DATABASE IF NOT EXISTS BibliotecaOnline;
USE BibliotecaOnline;

-- Tabela de Usuários (ATUALIZADA com IF NOT EXISTS)
CREATE TABLE IF NOT EXISTS Usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    senha VARCHAR(255) NOT NULL,
    tipo_usuario ENUM('estudante', 'professor', 'administrador') NOT NULL,
    data_cadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de Categorias (ATUALIZADA com IF NOT EXISTS)
CREATE TABLE IF NOT EXISTS Categorias (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome_categoria VARCHAR(100) NOT NULL,
    descricao TEXT
);

-- Tabela de Livros (ATUALIZADA com IF NOT EXISTS)
-- Tabela de Livros (CORRIGIDA com todas as colunas)

CREATE TABLE IF NOT EXISTS Livros (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(200) NOT NULL,
    autor VARCHAR(100) NOT NULL,
    isbn VARCHAR(20) UNIQUE,
    categoria_id INT,
    quantidade_total INT DEFAULT 1,
    quantidade_disponivel INT DEFAULT 1,
    data_publicacao DATE,      -- Coluna que estava faltando
    editora VARCHAR(100),      -- Coluna que estava faltando
    FOREIGN KEY (categoria_id) REFERENCES Categorias(id)
);

-- Tabela de Empréstimos (ATUALIZADA com IF NOT EXISTS)
CREATE TABLE IF NOT EXISTS Emprestimos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT NOT NULL,
    livro_id INT NOT NULL,
    data_emprestimo TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    data_devolucao_prevista DATE NOT NULL,
    data_devolucao_efetiva DATE NULL,
    status_emprestimo ENUM('ativo', 'devolvido', 'atrasado') DEFAULT 'ativo',
    FOREIGN KEY (usuario_id) REFERENCES Usuarios(id),
    FOREIGN KEY (livro_id) REFERENCES Livros(id)
);
