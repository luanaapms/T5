const express = require('express');
const router = express.Router();
const vendasController = require('../controllers/vendasController');

// Listar todas as vendas
router.get('/', vendasController.listarVendas);

// Buscar venda por ID
router.get('/:id', vendasController.buscarVendaPorId);

// Listagem 10 clientes que mais consumiram em quantidade
router.get('/relatorios/top10-quantidade', vendasController.top10ClientesQuantidade);

// Listagem geral de produtos ou serviços mais consumidos
router.get('/relatorios/mais-consumidos', vendasController.maisConsumidosGeral);

// Listagem de produtos ou serviços mais consumidos por gênero
router.get('/relatorios/mais-consumidos-genero', vendasController.maisConsumidosPorGenero);

// Listagem 10 clientes que menos consumiram produtos ou serviços
router.get('/relatorios/top10-menos', vendasController.top10ClientesMenosConsumiram);

// Listagem 5 clientes que mais consumiram em valor
router.get('/relatorios/top5-valor', vendasController.top5ClientesValor);

// Criar nova venda (consumir produto ou serviço)
router.post('/', vendasController.cadastrarVenda);

// Deletar venda
router.delete('/:id', vendasController.deletarVenda);

module.exports = router;