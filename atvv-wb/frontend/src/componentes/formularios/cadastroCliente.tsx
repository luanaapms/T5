import React, { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";

type Cliente = {
  nome: string;
  nomeSocial: string;
  genero: string;
  cpf: string;
  rg: string;
  telefone: string;
};

type Props = {
  tema?: string;
  onAdicionarCliente: (cliente: Cliente) => void;
  onCancelar: () => void;
};

const FormularioCadastroCliente: React.FC<Props> = ({ tema, onAdicionarCliente, onCancelar }) => {
  const [nome, setNome] = useState('');
  const [nomeSocial, setNomeSocial] = useState('');
  const [genero, setGenero] = useState('');
  const [cpf, setCpf] = useState('');
  const [rg, setRg] = useState('');
  const [telefone, setTelefone] = useState('');
  const [mensagem, setMensagem] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!nome || !genero || !cpf || !rg || !telefone) {
      setMensagem('Preencha todos os campos obrigatórios.');
      return;
    }

    const cliente = {
      nome,
      nomeSocial,
      genero,
      cpf,
      rg,
      telefone,
      quantidade: 0,
      valor: 0,
    };

    try {
      const response = await axios.post('http://localhost:3001/api/clientes', cliente);
      onAdicionarCliente(response.data);
      setMensagem('Cliente cadastrado com sucesso!');
      setNome('');
      setNomeSocial('');
      setGenero('');
      setCpf('');
      setRg('');
      setTelefone('');
    } catch (error) {
      console.error('Erro ao cadastrar cliente:', error);
      setMensagem('Erro ao cadastrar cliente.');
    }
  };

  const estiloBotao = `btn waves-effect waves-light ${tema || ''}`;

  return (
    <div className="container" style={{ paddingTop: '40px', maxWidth: 700 }}>
      <div className="card">
        <div className="card-content">
          <form className="row" onSubmit={handleSubmit}>
            <h5 className="card-title">Cadastro de Cliente</h5>

            <div className="input-field col s12 m6">
              <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} required />
              <label className={nome ? "active" : undefined}>Nome</label>
            </div>
            <div className="input-field col s12 m6">
              <input type="text" value={nomeSocial} onChange={(e) => setNomeSocial(e.target.value)} />
              <label className={nomeSocial ? "active" : undefined}>Nome Social</label>
            </div>

            <div className="input-field col s12 m6">
              <select
                value={genero}
                onChange={e => setGenero(e.target.value)}
                required
                className="browser-default"
              >
                <option value="" disabled>Selecione o gênero</option>
                <option value="F">F</option>
                <option value="M">M</option>
              </select>
            </div>

            <div className="input-field col s12 m6">
              <input type="text" value={cpf} onChange={(e) => setCpf(e.target.value)} required maxLength={11}
                pattern="\d{11}" />
              <label className={cpf ? "active" : undefined}>CPF</label>
            </div>

            <div className="input-field col s12 m6">
              <input type="text" value={rg} onChange={(e) => setRg(e.target.value)} required maxLength={9}
                pattern="\d{9}" />
              <label className={rg ? "active" : undefined}>RG</label>
            </div>

            <div className="input-field col s12 m6">
              <input type="text" value={telefone} onChange={(e) => setTelefone(e.target.value)} required maxLength={15}
                pattern="\d{15}" />
              <label className={telefone ? "active" : undefined}>Telefone</label>
            </div>

            <div className="col s12" style={{ marginTop: 30 }}>
              <button className={estiloBotao} type="submit">Cadastrar</button>
            </div>

            {mensagem && (
              <div className="col s12" style={{ marginTop: 20 }}>
                <span className="green-text">{mensagem}</span>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default FormularioCadastroCliente;
