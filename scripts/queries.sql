-- 1. Total de livros por categoria
SELECT c.nome_categoria, COUNT(l.id) as total_livros
FROM Categorias c
LEFT JOIN Livros l ON c.id = l.categoria_id
GROUP BY c.nome_categoria
ORDER BY total_livros DESC;

-- 2. Livro mais emprestado
SELECT l.titulo, l.autor, COUNT(e.id) as total_emprestimos
FROM Livros l
JOIN Emprestimos e ON l.id = e.livro_id
GROUP BY l.id
ORDER BY total_emprestimos DESC
LIMIT 1;

-- 3. Usuários com mais empréstimos realizados
SELECT u.nome, u.email, COUNT(e.id) as total_emprestimos
FROM Usuarios u
JOIN Emprestimos e ON u.id = e.usuario_id
GROUP BY u.id
ORDER BY total_emprestimos DESC;

-- 4. Livros que nunca foram emprestados
SELECT l.titulo, l.autor, l.quantidade_disponivel
FROM Livros l
LEFT JOIN Emprestimos e ON l.id = e.livro_id
WHERE e.id IS NULL
ORDER BY l.titulo;
