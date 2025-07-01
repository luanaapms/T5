const db = require('../models/db');

// Listar todos os clientes
exports.listarClientes = (req, res) => {
  const sql = 'SELECT * FROM Clientes';
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Erro ao buscar clientes:', err);
      return res.status(500).json({ erro: 'Erro ao buscar clientes' });
    }
    res.json(results);
  });
};

// Buscar cliente por id
exports.buscarClientePorId = (req, res) => {
  const id = req.params.id;
  const sql = 'SELECT * FROM Clientes WHERE id = ?';
  db.query(sql, [id], (err, results) => {
    if (err) {
      console.error('Erro ao buscar cliente:', err);
      return res.status(500).json({ erro: 'Erro ao buscar cliente' });
    }
    if (results.length === 0) {
      return res.status(404).json({ erro: 'Cliente não encontrado' });
    }
    res.json(results[0]);
  });
};

// Cadastrar novo cliente
exports.cadastrarCliente = (req, res) => {
  const { nome, nomeSocial, genero, cpf, rg, telefone, quantidade, valor } = req.body;
  const sql = `INSERT INTO Clientes (nome, nomeSocial, genero, cpf, rg, telefone, quantidade, valor) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
  db.query(sql, [nome, nomeSocial, genero, cpf, rg, telefone, quantidade, valor], (err, result) => {
    if (err) {
      console.error('Erro ao cadastrar cliente:', err);
      return res.status(500).json({ erro: 'Erro ao cadastrar cliente' });
    }
    res.status(201).json({ mensagem: 'Cliente cadastrado com sucesso', id: result.insertId });
  });
};

// Atualizar cliente por id
exports.atualizarCliente = (req, res) => {
  const id = req.params.id;
  const { nome, nomeSocial, genero, cpf, rg, telefone, quantidade, valor } = req.body;
  const sql = `
    UPDATE Clientes
    SET nome = ?, nomeSocial = ?, genero = ?, cpf = ?, rg = ?, telefone = ?, quantidade = ?, valor = ?
    WHERE id = ?`;
  db.query(sql, [nome, nomeSocial, genero, cpf, rg, telefone, quantidade, valor, id], (err, result) => {
    if (err) {
      console.error('Erro ao atualizar cliente:', err);
      return res.status(500).json({ erro: 'Erro ao atualizar cliente' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ erro: 'Cliente não encontrado' });
    }
    res.json({ mensagem: 'Cliente atualizado com sucesso' });
  });
};

// Deletar cliente por id
exports.deletarCliente = (req, res) => {
  const id = req.params.id;
  const sql = 'DELETE FROM Clientes WHERE id = ?';
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error('Erro ao deletar cliente:', err);
      return res.status(500).json({ erro: 'Erro ao deletar cliente' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ erro: 'Cliente não encontrado' });
    }
    res.json({ mensagem: 'Cliente deletado com sucesso' });
  });
};
