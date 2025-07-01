import React, { useState } from "react";
import axios from "axios";

type ClienteQuantidade = { nomeCliente: string; totalQuantidade: number };
type ProdutoServicoQuantidade = { produtoServico: string; totalQuantidade: number };
type ProdutoServicoGenero = { genero: string; produtoServico: string; totalQuantidade: number };
type ClienteValor = { nomeCliente: string; totalValor: number };
type ClienteGenero = { nomeCliente: string; genero: string };

const endpoints = [
  {
    label: "Top 10 Clientes por Quantidade",
    key: "top10ClientesQuantidade",
    url: "http://localhost:3001/api/vendas/relatorios/top10-quantidade",
    columns: [
      { label: "Cliente", field: "nomeCliente" },
      { label: "Quantidade", field: "totalQuantidade" },
    ],
  },
  {
    label: "Prod/Serv Mais Consumidos",
    key: "maisConsumidosGeral",
    url: "http://localhost:3001/api/vendas/relatorios/mais-consumidos",
    columns: [
      { label: "Produto/Serviço", field: "produtoServico" },
      { label: "Quantidade", field: "totalQuantidade" },
    ],
  },
  {
    label: "Mais Consumidos por Gênero",
    key: "maisConsumidosPorGenero",
    url: "http://localhost:3001/api/vendas/relatorios/mais-consumidos-genero",
    columns: [
      { label: "Gênero", field: "genero" },
      { label: "Produto/Serviço", field: "produtoServico" },
      { label: "Quantidade", field: "totalQuantidade" },
    ],
  },
  {
    label: "Top 10 Menos Consumiram",
    key: "top10ClientesMenosConsumiram",
    url: "http://localhost:3001/api/vendas/relatorios/top10-menos",
    columns: [
      { label: "Cliente", field: "nomeCliente" },
      { label: "Quantidade", field: "totalQuantidade" },
    ],
  },
  {
    label: "Top 5 Clientes por Valor",
    key: "top5ClientesValor",
    url: "http://localhost:3001/api/vendas/relatorios/top5-valor",
    columns: [
      { label: "Cliente", field: "nomeCliente" },
      { label: "Valor Total", field: "totalValor" },
    ],
  },
  {
    label: "Todos os Clientes por Gênero",
    key: "clientesPorGenero",
    url: "http://localhost:3001/api/clientes", 
    columns: [
      { label: "Cliente", field: "nome" },
      { label: "Gênero", field: "genero" },
    ],
    isGenero: true,
  },
];

const ConsultaVendas: React.FC = () => {
  const [dados, setDados] = useState<any[]>([]);
  const [colunas, setColunas] = useState<{ label: string; field: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const [generoTab, setGeneroTab] = useState(false);

  const buscar = async (endpoint: typeof endpoints[0]) => {
    setLoading(true);
    setGeneroTab(!!endpoint.isGenero);
    try {
      const res = await axios.get(endpoint.url);
      setDados(res.data);
      setColunas(endpoint.columns);
    } catch (e) {
      setDados([]);
      setColunas([]);
      alert("Erro ao buscar dados!");
    }
    setLoading(false);
  };


  const clientesMasculino = dados.filter((c: any) => c.genero === "M");
  const clientesFeminino = dados.filter((c: any) => c.genero === "F");

  return (
    <div className="card-panel">
      <h5>Consultas de Vendas</h5>
      <div className="row" style={{ marginBottom: 20 }}>
        {endpoints.map((ep) => (
          <div className="col s12 m6 l2" key={ep.key} style={{ marginBottom: 10 }}>
            <button
              className="btn green lighten-2"
              style={{ width: "100%",  fontSize: "0.95rem",
    padding: "8px 4px", }}
              onClick={() => buscar(ep)}
              type="button"
            >
              {ep.label}
            </button>
          </div>
        ))}
      </div>
      <div style={{ overflowX: "auto" }}>
        {!generoTab ? (
          <table className="striped centered">
            <thead>
              <tr>
                {colunas.map((col) => (
                  <th key={col.field}>{col.label}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={colunas.length}>Carregando...</td>
                </tr>
              ) : dados.length === 0 ? (
                <tr>
                  <td colSpan={colunas.length}>Selecione um relatório acima para visualizar os dados.</td>
                </tr>
              ) : (
                dados.map((linha, idx) => (
                  <tr key={idx}>
                    {colunas.map((col) => (
                      <td key={col.field}>
                        {col.field === "totalValor"
                          ? `R$ ${Number(linha[col.field]).toFixed(2)}`
                          : linha[col.field]}
                      </td>
                    ))}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        ) : (
          <div className="row">
            <div className="col s12 m6">
              <h6>Clientes Masculinos</h6>
              <table className="striped centered">
                <thead>
                  <tr>
                    {colunas.map((col) => (
                      <th key={col.field}>{col.label}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan={colunas.length}>Carregando...</td>
                    </tr>
                  ) : clientesMasculino.length === 0 ? (
                    <tr>
                      <td colSpan={colunas.length}>Nenhum dado encontrado</td>
                    </tr>
                  ) : (
                    clientesMasculino.map((linha: any, idx: number) => (
                      <tr key={idx}>
                        {colunas.map((col) => (
                          <td key={col.field}>{linha[col.field]}</td>
                        ))}
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
            <div className="col s12 m6">
              <h6>Clientes Femininos</h6>
              <table className="striped centered">
                <thead>
                  <tr>
                    {colunas.map((col) => (
                      <th key={col.field}>{col.label}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan={colunas.length}>Carregando...</td>
                    </tr>
                  ) : clientesFeminino.length === 0 ? (
                    <tr>
                      <td colSpan={colunas.length}>Nenhum dado encontrado</td>
                    </tr>
                  ) : (
                    clientesFeminino.map((linha: any, idx: number) => (
                      <tr key={idx}>
                        {colunas.map((col) => (
                          <td key={col.field}>{linha[col.field]}</td>
                        ))}
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ConsultaVendas;