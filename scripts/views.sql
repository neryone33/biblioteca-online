USE BibliotecaOnline;

-- View de Livros Disponíveis
CREATE VIEW LivrosDisponiveis AS
SELECT 
    l.id,
    l.titulo,
    l.autor,
    l.isbn,
    c.nome_categoria,
    l.quantidade_disponivel,
    l.editora
FROM Livros l
JOIN Categorias c ON l.categoria_id = c.id
WHERE l.quantidade_disponivel > 0;

-- View de Categorias Populares
CREATE VIEW CategoriasPopulares AS
SELECT 
    c.id,
    c.nome_categoria,
    COUNT(e.id) as total_emprestimos
FROM Categorias c
JOIN Livros l ON c.id = l.categoria_id
JOIN Emprestimos e ON l.id = e.livro_id
GROUP BY c.id, c.nome_categoria
ORDER BY total_emprestimos DESC;

-- View de Empréstimos Atrasados
CREATE VIEW EmprestimosAtrasados AS
SELECT 
    e.id,
    u.nome as usuario_nome,
    l.titulo as livro_titulo,
    e.data_emprestimo,
    e.data_devolucao_prevista,
    DATEDIFF(CURDATE(), e.data_devolucao_prevista) as dias_atraso
FROM Emprestimos e
JOIN Usuarios u ON e.usuario_id = u.id
JOIN Livros l ON e.livro_id = l.id
WHERE e.status_emprestimo = 'atrasado' 
   OR (e.status_emprestimo = 'ativo' AND CURDATE() > e.data_devolucao_prevista);
