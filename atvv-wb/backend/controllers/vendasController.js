const db = require('../models/db');

// Listar todas as vendas
exports.listarVendas = (req, res) => {
  db.query('SELECT * FROM Vendas', (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
};

// Buscar venda por ID
exports.buscarVendaPorId = (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM Vendas WHERE id = ?', [id], (err, results) => {
    if (err) return res.status(500).json({ error: err });
    if (results.length === 0) return res.status(404).json({ error: 'Venda não encontrada' });
    res.json(results[0]);
  });
};

// Listagem 10 clientes que mais consumiram em quantidade
exports.top10ClientesQuantidade = (req, res) => {
  db.query(
    `SELECT nomeCliente, SUM(quantidade) as totalQuantidade
     FROM Vendas
     GROUP BY nomeCliente
     ORDER BY totalQuantidade DESC
     LIMIT 10`,
    (err, results) => {
      if (err) return res.status(500).json({ error: err });
      res.json(results);
    }
  );
};

// Listagem geral de produtos ou serviços mais consumidos
exports.maisConsumidosGeral = (req, res) => {
  db.query(
    `SELECT produtoServico, SUM(quantidade) as totalQuantidade
     FROM Vendas
     GROUP BY produtoServico
     ORDER BY totalQuantidade DESC`,
    (err, results) => {
      if (err) return res.status(500).json({ error: err });
      res.json(results);
    }
  );
};

// Listagem de produtos ou serviços mais consumidos por gênero
exports.maisConsumidosPorGenero = (req, res) => {
  db.query(
    `SELECT c.genero, v.produtoServico, SUM(v.quantidade) as totalQuantidade
     FROM Vendas v
     JOIN Clientes c ON v.nomeCliente = c.nome
     GROUP BY c.genero, v.produtoServico
     ORDER BY c.genero, totalQuantidade DESC`,
    (err, results) => {
      if (err) return res.status(500).json({ error: err });
      res.json(results);
    }
  );
};

// Listagem 10 clientes que menos consumiram produtos ou serviços
exports.top10ClientesMenosConsumiram = (req, res) => {
  db.query(
    `SELECT nomeCliente, SUM(quantidade) as totalQuantidade
     FROM Vendas
     GROUP BY nomeCliente
     ORDER BY totalQuantidade ASC
     LIMIT 10`,
    (err, results) => {
      if (err) return res.status(500).json({ error: err });
      res.json(results);
    }
  );
};

// Listagem 5 clientes que mais consumiram em valor
exports.top5ClientesValor = (req, res) => {
  db.query(
    `SELECT nomeCliente, SUM(valorTotal) as totalValor
     FROM Vendas
     GROUP BY nomeCliente
     ORDER BY totalValor DESC
     LIMIT 5`,
    (err, results) => {
      if (err) return res.status(500).json({ error: err });
      res.json(results);
    }
  );
};

// Criar nova venda (consumir produto ou serviço)
exports.cadastrarVenda = (req, res) => {
  const { nomeCliente, produtoServico, quantidade, valorTotal, tipoVenda } = req.body;
  if (!nomeCliente || !produtoServico || !quantidade || !valorTotal || !tipoVenda) {
    return res.status(400).json({ error: 'Dados incompletos' });
  }

  db.query(
    'INSERT INTO Vendas (nomeCliente, produtoServico, quantidade, valorTotal, tipoVenda) VALUES (?, ?, ?, ?, ?)',
    [nomeCliente, produtoServico, quantidade, valorTotal, tipoVenda],
    (err, result) => {
      if (err) return res.status(500).json({ error: err });

      // Atualiza vendas no produto ou serviço
      const tabela = tipoVenda.toLowerCase() === 'produto' ? 'Produtos' : 'Servicos';
      db.query(
        `UPDATE ${tabela} SET vendas = vendas + ?, vendasH = vendasH + IF((SELECT genero FROM Clientes WHERE nome = ?) = 'M', ?, 0), vendasM = vendasM + IF((SELECT genero FROM Clientes WHERE nome = ?) = 'F', ?, 0) WHERE nome = ?`,
        [quantidade, nomeCliente, quantidade, nomeCliente, quantidade, produtoServico]
      );

      res.status(201).json({ id: result.insertId, ...req.body });
    }
  );
};

// Deletar venda
exports.deletarVenda = (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM Vendas WHERE id = ?', [id], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Venda não encontrada' });
    res.json({ message: 'Venda excluída com sucesso' });
  });
};