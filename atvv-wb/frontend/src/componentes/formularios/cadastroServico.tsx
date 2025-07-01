import React, { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";

type Props = {
  tema: string;
  onAdicionarServico: (servico: { id: number; nome: string; preco: string }) => void;
  onCancelar: () => void;
  onCadastrar: () => void;
};

const FormularioCadastroServico: React.FC<Props> = ({ tema, onAdicionarServico }) => {
  const [nome, setNome] = useState<string>('');
  const [preco, setPreco] = useState<string>('');
  const [mensagem, setMensagem] = useState<string>('');
  const [erro, setErro] = useState<string>('');
  const [carregando, setCarregando] = useState<boolean>(false);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (name === "nome") setNome(value);
    if (name === "preco") setPreco(value);
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setMensagem('');
    setErro('');

    if (!nome.trim() || !preco.trim()) {
      setErro('Por favor, preencha todos os campos.');
      return;
    }

    setCarregando(true);
    try {
      const response = await axios.post('http://localhost:3001/api/servicos/', {
        nome: nome.trim(),
        preco: preco.trim()
      });

      const novoServico = {
        id: response.data.id,
        nome: nome.trim(),
        preco: preco.trim()
      };

      onAdicionarServico(novoServico);
      setNome('');
      setPreco('');
      setMensagem('Serviço cadastrado com sucesso!');
    } catch (error) {
      console.error('Erro ao cadastrar serviço:', error);
      setErro('Erro ao cadastrar serviço. Tente novamente.');
    } finally {
      setCarregando(false);
    }
  };

  const estiloBotao = `btn waves-effect waves-light ${tema}`;

  return (
    <div className="container" style={{ paddingTop: '40px', maxWidth: 600 }}>
      <div className="card">
        <div className="card-content">
          <form className="row" onSubmit={handleSubmit}>
            <h5 className="card-title">Cadastro de Serviço</h5>

            <div className="input-field col s12">
              <input
                id="nome"
                name="nome"
                type="text"
                className="validate"
                value={nome}
                onChange={handleChange}
                required
              />
              <label htmlFor="nome" className={nome ? 'active' : ''}>
                Nome do Serviço
              </label>
            </div>

            <div className="input-field col s12">
              <input
                id="preco"
                name="preco"
                type="text"
                className="validate"
                value={preco}
                onChange={handleChange}
                required
              />
              <label htmlFor="preco" className={preco ? 'active' : ''}>
                Preço
              </label>
            </div>

            {erro && (
              <div className="col s12" style={{ marginTop: 20 }}>
                <span className="red-text">{erro}</span>
              </div>
            )}

            {mensagem && (
              <div className="col s12" style={{ marginTop: 20 }}>
                <span className="green-text">{mensagem}</span>
              </div>
            )}

            <div className="col s12" style={{ marginTop: 30 }}>
              <button
                className={estiloBotao}
                type="submit"
                name="action"
                disabled={carregando}
              >
                {carregando ? "Cadastrando..." : "Cadastrar"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default FormularioCadastroServico;
