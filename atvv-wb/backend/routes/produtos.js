const express = require('express');
const router = express.Router();
const produtoController = require('../controllers/produtoController');

// Listar todos os produtos
router.get('/', produtoController.listarProdutos);

// Buscar produto por id
router.get('/:id', produtoController.buscarProdutoPorId);

// Cadastrar novo produto
router.post('/', produtoController.cadastrarProduto);

// Atualizar produto por id
router.put('/:id', produtoController.atualizarProduto);

// Deletar produto por id
router.delete('/:id', produtoController.deletarProduto);

module.exports = router;
