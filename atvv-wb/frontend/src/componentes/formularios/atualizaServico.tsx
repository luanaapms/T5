import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import axios from "axios";

type Props = {
  tema: string;
  id: number;
  nomeInicial: string;
  precoInicial: string;
  onAtualizar: (servicoAtualizado: { id: number; nome: string; preco: string }) => void;
  onCancelar: () => void;
};

const FormularioAtualizarServico: React.FC<Props> = ({
  tema,
  id,
  nomeInicial,
  precoInicial,
  onAtualizar,
  onCancelar,
}) => {
  const [nome, setNome] = useState<string>(nomeInicial);
  const [preco, setPreco] = useState<string>(precoInicial);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState<string>("");

  useEffect(() => {
    setNome(nomeInicial);
    setPreco(precoInicial);
  }, [nomeInicial, precoInicial]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "nome") setNome(value);
    else if (name === "preco") setPreco(value);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErro("");
    setCarregando(true);

    try {
      await axios.put(`http://localhost:3001/api/servicos/${id}`, { nome, preco });
      onAtualizar({ id, nome, preco });
    } catch (error) {
      console.error("Erro ao atualizar serviço:", error);
      setErro("Erro ao atualizar serviço. Tente novamente.");
    } finally {
      setCarregando(false);
    }
  };

  const estiloBotao = `btn waves-effect waves-light ${tema}`;

  return (
    <div className="row">
      <form className="col s12" onSubmit={handleSubmit}>
        <h5>Atualizar Serviço</h5>
        <div className="row">
          <div className="input-field col s6">
            <input
              name="nome"
              type="text"
              value={nome}
              onChange={handleChange}
              required
            />
            <label className={nome ? "active" : ""}>Nome do Serviço</label>
          </div>
          <div className="input-field col s6">
            <input
              name="preco"
              type="text"
              value={preco}
              onChange={handleChange}
              required
            />
            <label className={preco ? "active" : ""}>Preço</label>
          </div>
        </div>

        {erro && (
          <div className="red-text" style={{ marginBottom: "10px" }}>
            {erro}
          </div>
        )}

        <button className={estiloBotao} type="submit" disabled={carregando}>
          {carregando ? "Atualizando..." : "Atualizar"}
        </button>
        <button
          type="button"
          className="btn grey"
          style={{ marginLeft: 10 }}
          onClick={onCancelar}
          disabled={carregando}
        >
          Cancelar
        </button>
      </form>
    </div>
  );
};

export default FormularioAtualizarServico;
