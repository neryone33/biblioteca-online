USE BibliotecaOnline;

-- Inserção de Categorias
INSERT INTO Categorias (nome_categoria, descricao) VALUES
('Ficção', 'Livros de ficção e literatura'),
('Técnico', 'Livros técnicos e especializados'),
('Ciências', 'Livros de ciências exatas e naturais'),
('História', 'Livros de história e biografias'),
('Arte', 'Livros de arte e cultura');

-- Inserção de Livros
INSERT INTO Livros (titulo, autor, isbn, categoria_id, quantidade_total, quantidade_disponivel, data_publicacao, editora) VALUES
('O Senhor dos Anéis', 'J.R.R. Tolkien', '978-0547928210', 1, 3, 2, '1954-07-29', 'HarperCollins'),
('Clean Code', 'Robert C. Martin', '978-0132350884', 2, 5, 4, '2008-08-01', 'Prentice Hall'),
('Física Quântica', 'David Griffiths', '978-0131118928', 3, 2, 1, '2004-08-12', 'Pearson'),
('História do Brasil', 'Boris Fausto', '978-8531408946', 4, 4, 3, '1994-01-01', 'EDUSP'),
('Arte Moderna', 'Meyer Schapiro', '978-8531408953', 5, 2, 2, '1978-01-01', 'EDUSP');
