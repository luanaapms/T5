const express = require('express');
const router = express.Router();
const servicoController = require('../controllers/servicoController');

// Listar todos os serviços
router.get('/', servicoController.listarServicos);

// Buscar serviço por id
router.get('/:id', servicoController.buscarServicoPorId);

// Cadastrar novo serviço
router.post('/', servicoController.cadastrarServico);

// Atualizar serviço por id
router.put('/:id', servicoController.atualizarServico);

// Deletar serviço por id
router.delete('/:id', servicoController.deletarServico);

module.exports = router;
