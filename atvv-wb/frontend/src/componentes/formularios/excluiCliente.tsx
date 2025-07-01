import React, { FormEvent } from "react";

type Props = {
  tema: string;
  id: number;                   
  onExcluir: (id: number) => void;
  onCancelar: () => void;
};

const FormularioExcluirCliente: React.FC<Props> = ({ tema, id, onExcluir, onCancelar }) => {
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    onExcluir(id);
  };

  const estiloBotao = `btn waves-effect waves-light ${tema}`;

  return (
    <div className="card-panel red lighten-5">
      <form onSubmit={handleSubmit}>
        <h5 className="red-text">Confirmar Exclusão</h5>
        <p>Deseja realmente excluir o cliente com ID <strong>{id}</strong>?</p>

        <div className="row">
          <div className="col s6">
            <button className={estiloBotao} type="submit">
              Excluir
            </button>
          </div>
          <div className="col s6">
            <button type="button" className="btn grey" onClick={onCancelar}>
              Cancelar
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default FormularioExcluirCliente;
