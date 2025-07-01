const db = require('../models/db');

// Listar todos os serviços
exports.listarServicos = (req, res) => {
  const sql = 'SELECT * FROM Servicos';
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Erro ao buscar serviços:', err);
      return res.status(500).json({ erro: 'Erro ao buscar serviços' });
    }
    res.json(results);
  });
};

// Buscar serviço por id
exports.buscarServicoPorId = (req, res) => {
  const id = req.params.id;
  const sql = 'SELECT * FROM Servicos WHERE id = ?';
  db.query(sql, [id], (err, results) => {
    if (err) {
      console.error('Erro ao buscar serviço:', err);
      return res.status(500).json({ erro: 'Erro ao buscar serviço' });
    }
    if (results.length === 0) {
      return res.status(404).json({ erro: 'Serviço não encontrado' });
    }
    res.json(results[0]);
  });
};

// Cadastrar novo serviço
exports.cadastrarServico = (req, res) => {
  const { nome, preco, vendas, vendasH, vendasM, tipo } = req.body;
  const sql = `INSERT INTO Servicos (nome, preco, vendas, vendasH, vendasM, tipo) VALUES (?, ?, ?, ?, ?, ?)`;
  db.query(sql, [nome, preco, vendas, vendasH, vendasM, tipo], (err, result) => {
    if (err) {
      console.error('Erro ao cadastrar serviço:', err);
      return res.status(500).json({ erro: 'Erro ao cadastrar serviço' });
    }
    res.status(201).json({ mensagem: 'Serviço cadastrado com sucesso', id: result.insertId });
  });
};

// Atualizar serviço por id
exports.atualizarServico = (req, res) => {
  const id = req.params.id;
  const { nome, preco, vendas, vendasH, vendasM, tipo } = req.body;
  const sql = `
    UPDATE Servicos
    SET nome = ?, preco = ?, vendas = ?, vendasH = ?, vendasM = ?, tipo = ?
    WHERE id = ?`;
  db.query(sql, [nome, preco, vendas, vendasH, vendasM, tipo, id], (err, result) => {
    if (err) {
      console.error('Erro ao atualizar serviço:', err);
      return res.status(500).json({ erro: 'Erro ao atualizar serviço' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ erro: 'Serviço não encontrado' });
    }
    res.json({ mensagem: 'Serviço atualizado com sucesso' });
  });
};

// Deletar serviço por id
exports.deletarServico = (req, res) => {
  const id = req.params.id;
  const sql = 'DELETE FROM Servicos WHERE id = ?';
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error('Erro ao deletar serviço:', err);
      return res.status(500).json({ erro: 'Erro ao deletar serviço' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ erro: 'Serviço não encontrado' });
    }
    res.json({ mensagem: 'Serviço deletado com sucesso' });
  });
};
