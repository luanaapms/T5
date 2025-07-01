import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";

type Cliente = {
  id: number;
  nome: string;
  nomeSocial: string;
  genero: string;
  cpf: string;
  rg: string;
  telefone: string;
  quantidade?: number;
  valor?: number;
};

type Props = {
  tema: string;
  cliente: Cliente;
  onAtualizar: (cliente: Cliente) => void;
  onCancelar: () => void;
};

const FormularioAtualizarCliente: React.FC<Props> = ({
  tema,
  cliente,
  onAtualizar,
  onCancelar,
}) => {
  const [nome, setNome] = useState("");
  const [nomeSocial, setNomeSocial] = useState("");
  const [genero, setGenero] = useState("");
  const [cpf, setCpf] = useState("");
  const [rg, setRg] = useState("");
  const [telefone, setTelefone] = useState("");

  useEffect(() => {
    setNome(cliente.nome || "");
    setNomeSocial(cliente.nomeSocial || "");
    setGenero(cliente.genero || "");
    setCpf(cliente.cpf || "");
    setRg(cliente.rg || "");
    setTelefone(cliente.telefone || "");
  }, [cliente]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (name === "nome") setNome(value);
    if (name === "nomeSocial") setNomeSocial(value);
    if (name === "genero") setGenero(value);
    if (name === "rg") setRg(value);
    if (name === "telefone") setTelefone(value);
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const clienteAtualizado: Cliente = {
      id: cliente.id,
      nome,
      nomeSocial,
      genero,
      cpf,
      rg,
      telefone,
      quantidade: cliente.quantidade || 0,
      valor: cliente.valor || 0,
    };
    onAtualizar(clienteAtualizado);
  };

  const estiloBotao = `btn waves-effect waves-light ${tema}`;

  return (
    <div className="container" style={{ paddingTop: "20px", maxWidth: 800 }}>
      <div className="card-panel">
        <form onSubmit={handleSubmit}>
          <h5 className="center-align">Atualizar Cliente</h5>

          <div className="row">
            <div className="input-field col s6">
              <input
                name="nome"
                type="text"
                value={nome}
                onChange={handleChange}
                required
              />
              <label className="active">Nome</label>
            </div>
            <div className="input-field col s6">
              <input
                name="nomeSocial"
                type="text"
                value={nomeSocial}
                onChange={handleChange}
              />
              <label className="active">Nome Social</label>
            </div>
          </div>

          <div className="row">
            <div className="input-field col s6">
              <input
                name="genero"
                type="text"
                value={genero}
                onChange={handleChange}
                required
              />
              <label className="active">Gênero</label>
            </div>
            <div className="input-field col s6">
              <input name="cpf" type="text" value={cpf} disabled />
              <label className="active">CPF</label>
            </div>
          </div>

          <div className="row">
            <div className="input-field col s6">
              <input
                name="rg"
                type="text"
                value={rg}
                onChange={handleChange}
                required
              />
              <label className="active">RG</label>
            </div>
            <div className="input-field col s6">
              <input
                name="telefone"
                type="text"
                value={telefone}
                onChange={handleChange}
                required
              />
              <label className="active">Telefone</label>
            </div>
          </div>

          <div className="row" style={{ marginTop: "20px" }}>
            <div className="col s6">
              <button className={estiloBotao} type="submit">
                Atualizar
              </button>
            </div>
            <div className="col s6">
              <button
                type="button"
                className="btn grey"
                onClick={onCancelar}
              >
                Cancelar
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormularioAtualizarCliente;
