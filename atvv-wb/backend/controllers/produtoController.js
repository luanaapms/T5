const db = require('../models/db');

// Listar todos os produtos
exports.listarProdutos = (req, res) => {
  const sql = 'SELECT * FROM Produtos';
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Erro ao buscar produtos:', err);
      return res.status(500).json({ erro: 'Erro ao buscar produtos' });
    }
    res.json(results);
  });
};

// Buscar produto por id
exports.buscarProdutoPorId = (req, res) => {
  const id = req.params.id;
  const sql = 'SELECT * FROM Produtos WHERE id = ?';
  db.query(sql, [id], (err, results) => {
    if (err) {
      console.error('Erro ao buscar produto:', err);
      return res.status(500).json({ erro: 'Erro ao buscar produto' });
    }
    if (results.length === 0) {
      return res.status(404).json({ erro: 'Produto não encontrado' });
    }
    res.json(results[0]);
  });
};

// Cadastrar novo produto
exports.cadastrarProduto = (req, res) => {
  const { nome, preco, vendas, vendasH, vendasM, tipo } = req.body;
  const sql = `INSERT INTO Produtos (nome, preco, vendas, vendasH, vendasM, tipo) VALUES (?, ?, ?, ?, ?, ?)`;
  db.query(sql, [nome, preco, vendas, vendasH, vendasM, tipo], (err, result) => {
    if (err) {
      console.error('Erro ao cadastrar produto:', err);
      return res.status(500).json({ erro: 'Erro ao cadastrar produto' });
    }
    res.status(201).json({ mensagem: 'Produto cadastrado com sucesso', id: result.insertId });
  });
};

// Atualizar produto por id
exports.atualizarProduto = (req, res) => {
  const id = req.params.id;
  const { nome, preco, vendas, vendasH, vendasM, tipo } = req.body;
  const sql = `
    UPDATE Produtos
    SET nome = ?, preco = ?, vendas = ?, vendasH = ?, vendasM = ?, tipo = ?
    WHERE id = ?`;
  db.query(sql, [nome, preco, vendas, vendasH, vendasM, tipo, id], (err, result) => {
    if (err) {
      console.error('Erro ao atualizar produto:', err);
      return res.status(500).json({ erro: 'Erro ao atualizar produto' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ erro: 'Produto não encontrado' });
    }
    res.json({ mensagem: 'Produto atualizado com sucesso' });
  });
};

// Deletar produto por id
exports.deletarProduto = (req, res) => {
  const id = req.params.id;
  const sql = 'DELETE FROM Produtos WHERE id = ?';
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error('Erro ao deletar produto:', err);
      return res.status(500).json({ erro: 'Erro ao deletar produto' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ erro: 'Produto não encontrado' });
    }
    res.json({ mensagem: 'Produto deletado com sucesso' });
  });
};
