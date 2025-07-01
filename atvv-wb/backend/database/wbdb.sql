CREATE DATABASE WorldBeauty;
USE WorldBeauty;

CREATE TABLE Clientes (
    id INT AUTO_INCREMENT KEY,
    nome VARCHAR(100),
    nomeSocial VARCHAR(100),
    genero VARCHAR(1),
    cpf VARCHAR(11) UNIQUE,
    rg VARCHAR(9) UNIQUE,
    telefone VARCHAR(15) UNIQUE,
    quantidade INT,
    valor FLOAT
);

CREATE TABLE Produtos (
    id INT AUTO_INCREMENT KEY,
    nome VARCHAR(50),
    preco FLOAT,
    vendas INT,
    vendasH INT,
    vendasM INT,
    tipo VARCHAR(7)
);

CREATE TABLE Servicos (
    id INT AUTO_INCREMENT KEY,
    nome VARCHAR(50),
    preco FLOAT,
    vendas INT,
    vendasH INT,
    vendasM INT,
    tipo VARCHAR(7)
);

CREATE TABLE Vendas (
   id INT AUTO_INCREMENT KEY,
   nomeCliente VARCHAR(100),
   produtoServico VARCHAR(100),
   quantidade INT,
   valorTotal FLOAT,
   tipoVenda VARCHAR(10)
   );

SELECT * FROM clientes;