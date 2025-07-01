import React, { useState, useEffect, ChangeEvent } from "react";
import axios from "axios";
import 'materialize-css/dist/css/materialize.min.css';
import FormularioAtualizarProduto from "../formularios/atualizaProduto";
import FormularioExcluirProduto from "../formularios/excluiProduto";

type Produto = {
  id: number;
  nome: string;
  preco: string;
  vendas?: number;
  vendasH?: number;
  vendasM?: number;
  tipo?: string;
};

type Props = {
  tema?: string;
  produtos: Produto[];
  setProdutos: React.Dispatch<React.SetStateAction<Produto[]>>;
};

const ListaProduto: React.FC<Props> = ({ tema }) => {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [busca, setBusca] = useState<string>('');
  const [produtoEditando, setProdutoEditando] = useState<Produto | null>(null);
  const [produtoExcluindo, setProdutoExcluindo] = useState<Produto | null>(null);
  const [paginaAtual, setPaginaAtual] = useState<number>(1);
  const produtosPorPagina = 5;

  const carregarProdutos = async () => {
    try {
      const response = await axios.get<Produto[]>('http://localhost:3001/api/produtos/');
      setProdutos(response.data);
    } catch (error) {
      console.error('Erro ao carregar produtos:', error);
      alert('Erro ao carregar produtos do servidor.');
    }
  };

  useEffect(() => {
    carregarProdutos();
  }, []);

  const handleBuscaChange = (e: ChangeEvent<HTMLInputElement>) => {
    setBusca(e.target.value);
    setPaginaAtual(1);
  };

  // Atualiza produto no backend
  const atualizarProduto = async (produtoAtualizado: Produto) => {
    try {
      await axios.put(`http://localhost:3001/api/produtos/${produtoAtualizado.id}`, produtoAtualizado);
      setProdutos(prev =>
        prev.map(p => (p.id === produtoAtualizado.id ? produtoAtualizado : p))
      );
      setProdutoEditando(null);
    } catch (error) {
      console.error('Erro ao atualizar produto:', error);
      alert('Erro ao atualizar produto.');
    }
  };

  // Exclui produto 
  const excluirProduto = async (id: number) => {
    try {
      await axios.delete(`http://localhost:3001/api/produtos/${id}`);
      setProdutos(prev => prev.filter(p => p.id !== id));
      setProdutoExcluindo(null);
    } catch (error) {
      console.error('Erro ao deletar produto:', error);
      alert('Erro ao deletar produto.');
    }
  };

  // Filtra produtos pela busca
  const produtosFiltrados = produtos.filter(produto =>
    produto.nome.toLowerCase().includes(busca.toLowerCase())
  );

 
  const indexUltimoProduto = paginaAtual * produtosPorPagina;
  const indexPrimeiroProduto = indexUltimoProduto - produtosPorPagina;
  const produtosPaginaAtual = produtosFiltrados.slice(indexPrimeiroProduto, indexUltimoProduto);
  const totalPaginas = Math.ceil(produtosFiltrados.length / produtosPorPagina);

  const irParaPagina = (num: number) => {
    if (num < 1) num = 1;
    else if (num > totalPaginas) num = totalPaginas;
    setPaginaAtual(num);
  };

  return (
    <div className="container">
      <h4 className="center-align">Lista de Produtos</h4>

      <div className="input-field">
        <input
          type="text"
          placeholder="Buscar por nome"
          value={busca}
          onChange={handleBuscaChange}
        />
      </div>

      {produtoEditando && (
        <FormularioAtualizarProduto
          tema={tema || ''}
          id={produtoEditando.id}
          nomeInicial={produtoEditando.nome}
          precoInicial={produtoEditando.preco}
          onAtualizar={atualizarProduto}
          onCancelar={() => setProdutoEditando(null)}
        />
      )}

      {produtoExcluindo && (
        <FormularioExcluirProduto
          tema={tema || ''}
          id={produtoExcluindo.id}
          nomeInicial={produtoExcluindo.nome}
          onExcluir={excluirProduto}
          onCancelar={() => setProdutoExcluindo(null)}
        />
      )}

      {produtosPaginaAtual.length > 0 ? (
        <>
          <ul className="collection">
            {produtosPaginaAtual.map((produto) => (
              <li key={produto.id} className="collection-item">
                <strong>Nome do produto:</strong> {produto.nome}<br />
                <strong>Preço:</strong> {produto.preco}<br />
                <button
                  className="btn green lighten-2"
                  onClick={() => setProdutoEditando(produto)}
                >
                  Atualizar
                </button>
                <button
                  className="btn purple darken-2"
                  style={{ marginLeft: '10px' }}
                  onClick={() => setProdutoExcluindo(produto)}
                >
                  Excluir
                </button>
              </li>
            ))}
          </ul>

          <div className="center-align" style={{ marginTop: '20px' }}>
            <button
              className="btn purple lighten-4"
              disabled={paginaAtual === 1}
              onClick={() => irParaPagina(paginaAtual - 1)}
              style={{ marginRight: '10px' }}
            >
              Anterior
            </button>

            {[...Array(totalPaginas)].map((_, i) => {
              const numPagina = i + 1;
              return (
                <button
                  key={numPagina}
                  className={`btn ${paginaAtual === numPagina ? 'purple darken-2' : 'purple lighten-4'}`}
                  style={{ marginRight: '5px' }}
                  onClick={() => irParaPagina(numPagina)}
                >
                  {numPagina}
                </button>
              );
            })}

            <button
              className="btn purple lighten-4"
              disabled={paginaAtual === totalPaginas}
              onClick={() => irParaPagina(paginaAtual + 1)}
              style={{ marginLeft: '10px' }}
            >
              Próxima
            </button>
          </div>
        </>
      ) : (
        <p className="center-align">Nenhum produto encontrado.</p>
      )}
    </div>
  );
};

export default ListaProduto;
