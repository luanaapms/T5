import React, { useState, useEffect, ChangeEvent } from "react";
import axios from "axios";
import 'materialize-css/dist/css/materialize.min.css';
import FormularioAtualizarServico from "../formularios/atualizaServico";
import FormularioExcluirServico from "../formularios/excluiServico";

type Servico = {
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
  servicos: Servico[];
  setServicos: React.Dispatch<React.SetStateAction<Servico[]>>;
};

const ListaServico: React.FC<Props> = ({ tema }) => {
  const [servicos, setServicos] = useState<Servico[]>([]);
  const [busca, setBusca] = useState<string>('');
  const [servicoEditando, setServicoEditando] = useState<Servico | null>(null);
  const [servicoExcluindo, setServicoExcluindo] = useState<Servico | null>(null);
  const [paginaAtual, setPaginaAtual] = useState<number>(1);
  const servicosPorPagina = 5;

  // Carregar serviços do backend
  const carregarServicos = async () => {
    try {
      const response = await axios.get<Servico[]>('http://localhost:3001/api/servicos/');
      setServicos(response.data);
    } catch (error) {
      console.error('Erro ao carregar serviços:', error);
      alert('Erro ao carregar serviços do servidor.');
    }
  };

  useEffect(() => {
    carregarServicos();
  }, []);

  const handleBuscaChange = (e: ChangeEvent<HTMLInputElement>) => {
    setBusca(e.target.value);
    setPaginaAtual(1);
  };

  const atualizarServico = async (servicoAtualizado: Servico) => {
    try {
      await axios.put(`http://localhost:3001/api/servicos/${servicoAtualizado.id}`, servicoAtualizado);
      setServicos(prev =>
        prev.map(s => (s.id === servicoAtualizado.id ? servicoAtualizado : s))
      );
      setServicoEditando(null);
    } catch (error) {
      console.error('Erro ao atualizar serviço:', error);
      alert('Erro ao atualizar serviço.');
    }
  };

  const excluirServico = async (id: number) => {
    try {
      await axios.delete(`http://localhost:3001/api/servicos/${id}`);
      setServicos(prev => prev.filter(s => s.id !== id));
      setServicoExcluindo(null);
    } catch (error) {
      console.error('Erro ao deletar serviço:', error);
      alert('Erro ao deletar serviço.');
    }
  };

  const servicosFiltrados = servicos.filter(servico =>
    servico.nome.toLowerCase().includes(busca.toLowerCase())
  );

  const indexUltimoServico = paginaAtual * servicosPorPagina;
  const indexPrimeiroServico = indexUltimoServico - servicosPorPagina;
  const servicosPaginaAtual = servicosFiltrados.slice(indexPrimeiroServico, indexUltimoServico);
  const totalPaginas = Math.ceil(servicosFiltrados.length / servicosPorPagina);

  const irParaPagina = (num: number) => {
    if (num < 1) num = 1;
    else if (num > totalPaginas) num = totalPaginas;
    setPaginaAtual(num);
  };

  return (
    <div className="container">
      <h4 className="center-align">Lista de Serviços</h4>

      <div className="input-field" style={{ marginTop: '30px' }}>
        <input
          type="text"
          placeholder="Buscar por nome"
          value={busca}
          onChange={handleBuscaChange}
        />
      </div>

      {servicoEditando && (
        <FormularioAtualizarServico
          tema={tema || ''}
          id={servicoEditando.id}
          nomeInicial={servicoEditando.nome}
          precoInicial={servicoEditando.preco}
          onAtualizar={atualizarServico}
          onCancelar={() => setServicoEditando(null)}
        />
      )}

      {servicoExcluindo && (
        <FormularioExcluirServico
          tema={tema || ''}
          id={servicoExcluindo.id}
          nomeInicial={servicoExcluindo.nome}
          onExcluir={excluirServico}
          onCancelar={() => setServicoExcluindo(null)}
        />
      )}

      {servicosPaginaAtual.length > 0 ? (
        <>
          <ul className="collection" style={{ marginTop: '20px' }}>
            {servicosPaginaAtual.map((servico) => (
              <li key={servico.id} className="collection-item">
                <strong>Nome do serviço:</strong> {servico.nome}<br />
                <strong>Preço:</strong> {servico.preco}<br />
                <button
                  className="btn green lighten-2"
                  onClick={() => setServicoEditando(servico)}
                >
                  Atualizar
                </button>
                <button
                  className="btn purple darken-2"
                  style={{ marginLeft: '10px' }}
                  onClick={() => setServicoExcluindo(servico)}
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
        <p className="center-align" style={{ marginTop: '20px' }}>Nenhum serviço encontrado.</p>
      )}
    </div>
  );
};

export default ListaServico;
