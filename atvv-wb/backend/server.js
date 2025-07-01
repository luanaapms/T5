const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

const clienteRoutes = require('./routes/clientes');
app.use('/api/clientes', clienteRoutes);

const produtoRoutes = require('./routes/produtos');
app.use('/api/produtos', produtoRoutes);

const servicoRoutes = require('./routes/servicos');
app.use('/api/servicos', servicoRoutes);

const vendaRoutes = require('./routes/vendas');
app.use('/api/vendas', vendaRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});
