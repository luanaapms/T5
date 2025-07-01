const express = require('express');
const router = express.Router();
const clienteController = require('../controllers/clienteController');

// Listar todos os clientes
router.get('/', clienteController.listarClientes);

// Buscar cliente por id
router.get('/:id', clienteController.buscarClientePorId);

// Cadastrar novo cliente
router.post('/', clienteController.cadastrarCliente);

// Atualizar cliente por id
router.put('/:id', clienteController.atualizarCliente);

// Deletar cliente por id
router.delete('/:id', clienteController.deletarCliente);

module.exports = router;
