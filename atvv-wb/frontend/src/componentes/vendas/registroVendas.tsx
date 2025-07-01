import React, { useEffect, useState, FormEvent } from "react";
import axios from "axios";
import M from "materialize-css";

type Cliente = { id: number; nome: string };
type ProdutoOuServico = { id: number; nome: string; preco: number };
type Venda = {
  id: number;
  nomeCliente: string;
  produtoServico: string;
  quantidade: number;
  valorTotal: number;
  tipoVenda: string;
};

const RegistroVendas: React.FC = () => {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [produtos, setProdutos] = useState<ProdutoOuServico[]>([]);
  const [servicos, setServicos] = useState<ProdutoOuServico[]>([]);
  const [vendas, setVendas] = useState<Venda[]>([]);
  const [clienteId, setClienteId] = useState<number | "">("");
  const [tipoVenda, setTipoVenda] = useState<"produto" | "servico" | "">("");
  const [itemId, setItemId] = useState<number | "">("");
  const [quantidade, setQuantidade] = useState<number>(1);
  const [valorTotal, setValorTotal] = useState<number>(0);

  const initSelects = () => {
    const elems = document.querySelectorAll("select");
    M.FormSelect.init(elems);
  };

  useEffect(() => {
    const fetch = async () => {
      const [cliRes, prodRes, servRes] = await Promise.all([
        axios.get("http://localhost:3001/api/clientes"),
        axios.get("http://localhost:3001/api/produtos"),
        axios.get("http://localhost:3001/api/servicos"),
      ]);
      setClientes(cliRes.data);
      setProdutos(prodRes.data);
      setServicos(servRes.data);
    };
    fetch();
  }, []);

  useEffect(() => {
    initSelects();
  }, [clientes, produtos, servicos, tipoVenda]);

  const buscarVendas = async () => {
    const res = await axios.get("http://localhost:3001/api/vendas");
    setVendas(res.data);
  };

  useEffect(() => {
    buscarVendas();
  }, []);

  useEffect(() => {
    let preco = 0;
    if (itemId !== "" && quantidade > 0) {
      if (tipoVenda === "produto") {
        const p = produtos.find(p => p.id === itemId);
        preco = p ? p.preco : 0;
      } else if (tipoVenda === "servico") {
        const s = servicos.find(s => s.id === itemId);
        preco = s ? s.preco : 0;
      }
    }
    setValorTotal(preco * quantidade);
  }, [tipoVenda, itemId, quantidade, produtos, servicos]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (clienteId === "" || tipoVenda === "" || itemId === "" || quantidade < 1) return;

    const cliente = clientes.find(c => c.id === Number(clienteId));
    const item =
      tipoVenda === "produto"
        ? produtos.find(p => p.id === Number(itemId))
        : servicos.find(s => s.id === Number(itemId));

    await axios.post("http://localhost:3001/api/vendas", {
      nomeCliente: cliente?.nome,
      produtoServico: item?.nome,
      quantidade,
      valorTotal,
      tipoVenda,
    });

    setClienteId("");
    setTipoVenda("");
    setItemId("");
    setQuantidade(1);
    setValorTotal(0);
    M.toast({ html: "Venda registrada com sucesso!" });
    buscarVendas();
  };

  return (
    <div className="card-panel">
      <h5>Registrar Venda</h5>
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="input-field col s12 m6 l3">
            <select
              value={clienteId}
              onChange={e => setClienteId(e.target.value === "" ? "" : Number(e.target.value))}
              required
            >
              <option value="" disabled>
                Selecione o cliente
              </option>
              {clientes.map(c => (
                <option key={c.id} value={c.id}>
                  {c.nome}
                </option>
              ))}
            </select>
            <label>Cliente</label>
          </div>

          <div className="input-field col s12 m6 l3">
            <select
              value={tipoVenda}
              onChange={e => {
                const val = e.target.value as "produto" | "servico";
                setTipoVenda(val);
                setItemId("");
              }}
              required
            >
              <option value="" disabled>
                Produto ou Serviço
              </option>
              <option value="produto">Produto</option>
              <option value="servico">Serviço</option>
            </select>
            <label>Tipo de Venda</label>
          </div>

          {tipoVenda && (
            <div className="input-field col s12 m6 l3">
              <select
                value={itemId}
                onChange={e => setItemId(e.target.value === "" ? "" : Number(e.target.value))}
                required
              >
                <option value="" disabled>
                  {tipoVenda === "produto"
                    ? "Selecione o produto"
                    : "Selecione o serviço"}
                </option>
                {(tipoVenda === "produto" ? produtos : servicos).map(item => (
                  <option key={item.id} value={item.id}>
                    {item.nome} (R$ {item.preco.toFixed(2)})
                  </option>
                ))}
              </select>
              <label>{tipoVenda === "produto" ? "Produto" : "Serviço"}</label>
            </div>
          )}

          <div className="input-field col s12 m6 l2">
            <input
              type="number"
              min={1}
              value={quantidade}
              onChange={e => setQuantidade(Number(e.target.value))}
              required
            />
            <label className="active">Quantidade</label>
          </div>

          <div className="input-field col s12 m6 l1">
            <input type="text" value={`R$ ${valorTotal.toFixed(2)}`} disabled />
            <label className="active">Valor Total</label>
          </div>
        </div>

        <button className="btn purple darken-2" type="submit">
          Registrar Venda
        </button>
      </form>

      <hr />

      <h5>Vendas Registradas</h5>
      <table className="striped">
        <thead>
          <tr>
            <th>Cliente</th>
            <th>Produto/Serviço</th>
            <th>Tipo</th>
            <th>Quantidade</th>
            <th>Valor Total</th>
          </tr>
        </thead>
        <tbody>
          {vendas.map(v => (
            <tr key={v.id}>
              <td>{v.nomeCliente}</td>
              <td>{v.produtoServico}</td>
              <td>{v.tipoVenda}</td>
              <td>{v.quantidade}</td>
              <td>R$ {v.valorTotal.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RegistroVendas;