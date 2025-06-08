-- Define o delimitador para // para que a procedure possa ser lida como um bloco único
DELIMITER //

CREATE PROCEDURE RealizarEmprestimo(
    IN p_usuario_id INT,
    IN p_livro_id INT,
    IN p_data_devolucao_prevista DATE
)
BEGIN
    DECLARE v_disponivel INT;
    
    -- Verificar disponibilidade
    SELECT quantidade_disponivel INTO v_disponivel 
    FROM Livros WHERE id = p_livro_id;
    
    IF v_disponivel > 0 THEN
        -- Inserir empréstimo
        INSERT INTO Emprestimos (usuario_id, livro_id, data_devolucao_prevista)
        VALUES (p_usuario_id, p_livro_id, p_data_devolucao_prevista);
        
        -- Atualizar disponibilidade
        UPDATE Livros 
        SET quantidade_disponivel = quantidade_disponivel - 1
        WHERE id = p_livro_id;
        
        SELECT 'Empréstimo realizado com sucesso' as mensagem;
    ELSE
        SELECT 'Livro não disponível' as mensagem;
    END IF;
END //

-- Trigger para atualizar disponibilidade na devolução
CREATE TRIGGER AtualizarDisponibilidadeAposDevolucao
    AFTER UPDATE ON Emprestimos
    FOR EACH ROW
BEGIN
    IF NEW.status_emprestimo = 'devolvido' AND OLD.status_emprestimo != 'devolvido' THEN
        UPDATE Livros 
        SET quantidade_disponivel = quantidade_disponivel + 1
        WHERE id = NEW.livro_id;
    END IF;
END //

-- Trigger para impedir empréstimo de livro indisponível
CREATE TRIGGER VerificarDisponibilidadeAntesEmprestimo
    BEFORE INSERT ON Emprestimos
    FOR EACH ROW
BEGIN
    DECLARE v_disponivel INT;
    
    SELECT quantidade_disponivel INTO v_disponivel 
    FROM Livros WHERE id = NEW.livro_id;
    
    IF v_disponivel <= 0 THEN
        SIGNAL SQLSTATE '45000' 
        SET MESSAGE_TEXT = 'Livro não disponível para empréstimo';
    END IF;
END //

-- Retorna o delimitador para o padrão (ponto e vírgula)
DELIMITER ;
