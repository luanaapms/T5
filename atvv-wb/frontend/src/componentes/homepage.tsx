import React from "react";

type Props = {
  tema: string;
  selecionarView: (tela: string) => void;
};

const HomePage: React.FC<Props> = ({ tema, selecionarView }) => {
  const estiloCard = `card ${tema}`;
  const estiloBtn = `btn waves-effect waves-light ${tema}`;

  const cards = [
    {
      titulo: "Cadastrar Cliente",
      descricao: "Adicione um novo cliente com seus dados pessoais e contatos.",
      tela: "Cadastrar Cliente",
    },
    {
      titulo: "Cadastrar Produto",
      descricao: "Inclua novos produtos com nome e preço no sistema.",
      tela: "Cadastrar Produto",
    },
    {
      titulo: "Cadastrar Serviço",
      descricao: "Registre serviços oferecidos com nome e valor.",
      tela: "Cadastrar Serviço",
    },
    {
      titulo: "Lista de Clientes",
      descricao: "Visualize, atualize ou exclua os clientes cadastrados.",
      tela: "Clientes",
    },
    {
      titulo: "Lista de Produtos",
      descricao: "Gerencie a lista de produtos disponíveis.",
      tela: "Produtos",
    },
    {
      titulo: "Lista de Serviços",
      descricao: "Acesse e edite todos os serviços oferecidos.",
      tela: "Serviços",
    },
    {
      titulo: "Registro de Vendas",
      descricao: "Registre novas vendas de produtos e serviços.",
      tela: "Registrar Venda",
    },
    {
      titulo: "Relatórios",
      descricao: "Acompanhe o consumo e os dados estatísticos do sistema.",
      tela: "Relatórios",
    },
  ];

  return (
    <div className="container" style={{ paddingTop: "40px" }}>
      <h3
        className="center-align"
        style={{ marginBottom: "10px", fontWeight: "600" }}
      >
        Bem-vindo ao grupo <span style={{ color: "#6a1b9a" }}>World Beauty!</span>
      </h3>
      <p
        className="center-align"
        style={{ fontSize: "16px", marginBottom: "40px", color: "#666" }}
      >
        Sistema de gestão de agenda de clientes, produtos e serviços de cosméticos e estética.
      </p>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "24px",
        }}
      >
        {cards.map((card, index) => {
          const isRelatorio = card.titulo === "Relatórios";
          const largura = isRelatorio ? "280px" : "280px";

          return (
            <div
              key={index}
              style={{
                width: largura,
                borderRadius: "12px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                padding: "20px",
                minHeight: "250px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                backgroundColor: "#fff",
              }}
              className={estiloCard}
            >
              <div>
                <h5 style={{ fontWeight: "500" }}>{card.titulo}</h5>
                <p style={{ fontSize: "14px", color: "#555" }}>{card.descricao}</p>
              </div>
              <div style={{ marginTop: "20px" }}>
                <button
                  className={estiloBtn}
                  style={{
                    borderRadius: "20px",
                    width: "100%",
                    fontWeight: "bold",
                  }}
                  onClick={() => selecionarView(card.tela)}
                >
                  Acessar
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HomePage;