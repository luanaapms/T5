import React, { useState, ChangeEvent, useEffect } from "react";
import 'materialize-css/dist/css/materialize.min.css';
import axios from "axios";
import FormularioAtualizarCliente from "../formularios/atualizaCliente";
import FormularioExcluirCliente from "../formularios/excluiCliente";

type Cliente = {
  id: number;
  nome: string;
  nomeSocial: string;
  genero: string;
  cpf: string;
  rg: string;
  telefone: string;
};

type Props = {
  tema?: string;
  clientes: Cliente[];
  setClientes: React.Dispatch<React.SetStateAction<Cliente[]>>;
};

const ListaCliente: React.FC<Props> = ({ tema, clientes, setClientes }) => {
  const [busca, setBusca] = useState<string>('');
  const [clienteEditando, setClienteEditando] = useState<Cliente | null>(null);
  const [idParaExcluir, setIdParaExcluir] = useState<number | null>(null);
  const [paginaAtual, setPaginaAtual] = useState<number>(1);
  const clientesPorPagina = 5;

  useEffect(() => {
    axios.get('http://localhost:3001/api/clientes')
      .then(response => {
        setClientes(response.data);
      })
      .catch(error => {
        console.error("Erro ao buscar clientes:", error);
      });
  }, []);

  const handleBuscaChange = (e: ChangeEvent<HTMLInputElement>) => {
    setBusca(e.target.value);
    setPaginaAtual(1);
  };

  // Atualizar cliente
  const atualizarCliente = (clienteAtualizado: Cliente) => {
    axios.put(`http://localhost:3001/api/clientes/${clienteAtualizado.id}`, clienteAtualizado)
      .then(() => {
        setClientes(prev =>
          prev.map(c => (c.id === clienteAtualizado.id ? { ...clienteAtualizado } : c))
        );
        setClienteEditando(null);
      })
      .catch(error => {
        console.error("Erro ao atualizar cliente:", error);
      });
  };

  // Excluir cliente
  const excluirCliente = (id: number) => {
    axios.delete(`http://localhost:3001/api/clientes/${id}`)
      .then(() => {
        setClientes(prev => prev.filter(c => c.id !== id));
        setIdParaExcluir(null);
      })
      .catch(error => {
        console.error("Erro ao excluir cliente:", error);
      });
  };

  // Filtro de busca
  const clientesFiltrados = clientes.filter(cliente =>
    cliente.cpf.toLowerCase().includes(busca.toLowerCase()) ||
    cliente.nome.toLowerCase().includes(busca.toLowerCase())
  );

  // Paginação
  const indexUltimoCliente = paginaAtual * clientesPorPagina;
  const indexPrimeiroCliente = indexUltimoCliente - clientesPorPagina;
  const clientesPaginaAtual = clientesFiltrados.slice(indexPrimeiroCliente, indexUltimoCliente);
  const totalPaginas = Math.ceil(clientesFiltrados.length / clientesPorPagina);

  const irParaPagina = (num: number) => {
    if (num < 1) num = 1;
    else if (num > totalPaginas) num = totalPaginas;
    setPaginaAtual(num);
  };

  const handleEditarCliente = (cliente: Cliente) => {
    setClienteEditando(cliente);
  };

  return (
    <div className="container">
      <h4 className="center-align">Lista de Clientes</h4>

      <div className="input-field">
        <input
          type="text"
          placeholder="Buscar por CPF"
          value={busca}
          onChange={handleBuscaChange}
        />
      </div>

      {clienteEditando && (
        <FormularioAtualizarCliente
          tema={tema || ''}
          cliente={clienteEditando}
          onAtualizar={atualizarCliente}
          onCancelar={() => setClienteEditando(null)}
        />
      )}

      {idParaExcluir !== null && (
        <FormularioExcluirCliente
          tema={tema || ''}
          id={idParaExcluir}
          onExcluir={excluirCliente}
          onCancelar={() => setIdParaExcluir(null)}
        />
      )}

      {clientesPaginaAtual.length > 0 ? (
        <>
          <ul className="collection">
            {clientesPaginaAtual.map((cliente) => (
              <li key={cliente.id} className="collection-item">
                <strong>Nome:</strong> {cliente.nome}<br />
                <strong>Nome Social:</strong> {cliente.nomeSocial}<br />
                <strong>Gênero:</strong> {cliente.genero}<br />
                <strong>CPF:</strong> {cliente.cpf}<br />
                <strong>RG:</strong> {cliente.rg}<br />
                <strong>Telefone:</strong> {cliente.telefone}<br />

                <button
                  className="btn green lighten-2"
                  onClick={() => handleEditarCliente(cliente)}
                >
                  Atualizar
                </button>
                <button
                  className="btn purple darken-2"
                  style={{ marginLeft: "10px" }}
                  onClick={() => setIdParaExcluir(cliente.id)}
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
        <p className="center-align">Nenhum cliente encontrado.</p>
      )}
    </div>
  );
};

export default ListaCliente;
