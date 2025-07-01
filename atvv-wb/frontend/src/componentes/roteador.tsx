import React, { useState } from "react";
import BarraNavegacao from "./barraNavegacao";
import HomePage from "./homepage";
import FormularioCadastroCliente from "./formularios/cadastroCliente";
import FormularioCadastroProduto from "./formularios/cadastroProduto";
import FormularioCadastroServico from "./formularios/cadastroServico";
import ListaCliente from "../componentes/listas/listaCliente";
import ListaProduto from "../componentes/listas/listaProduto";
import ListaServico from "../componentes/listas/listaServico";
import RegistroVendas from "./vendas/registroVendas";
import ConsultaVendas from "./vendas/consulta";

type ClienteDados = {
    id: number;
    nome: string;
    nomeSocial: string;
    genero: string;
    cpf: string;
    rg: string;
    telefone: string;
};

type Produto = {
    id: number;
    nome: string;
    preco: string;
    vendas?: number;
    vendasH?: number;
    vendasM?: number;
    tipo?: string;
};

type Servico = {
    id: number;
    nome: string;
    preco: string;
    vendas?: number;
    vendasH?: number;
    vendasM?: number;
    tipo?: string;
};

type Props = {};

export default function Roteador(props: Props) {
    const [tela, setTela] = useState<string>("Início");

    const [clientes, setClientes] = useState<ClienteDados[]>([]);
    const [produtos, setProdutos] = useState<Produto[]>([]);
    const [servicos, setServicos] = useState<Servico[]>([]);

    const selecionarView = (novaTela: string) => {
        setTela(novaTela);
    };

    const tema = "purple lighten-4";

    return (
        <>
            <BarraNavegacao
                seletorView={selecionarView}
                tema={tema}
                botoes={[
                    "Clientes",
                    "Produtos",
                    "Serviços",
                    "Cadastrar Cliente",
                    "Cadastrar Produto",
                    "Cadastrar Serviço",
                    "Registrar Venda",
                    "Relatórios",
                ]}
            />
            {tela === "Início" && <HomePage tema={tema} selecionarView={selecionarView} />}

            {tela === "Clientes" && (
                <ListaCliente tema={tema} clientes={clientes} setClientes={setClientes} />
            )}
            {tela === "Cadastrar Cliente" && (
                <FormularioCadastroCliente
                    tema={tema}
                    onAdicionarCliente={(cliente) => {
                        setTela("Clientes");
                    }}
                    onCancelar={() => setTela("Clientes")}
                />
            )}
            {tela === "Produtos" && (
                <ListaProduto tema={tema} produtos={produtos} setProdutos={setProdutos} />
            )}
            {tela === "Cadastrar Produto" && (
                <FormularioCadastroProduto
                    tema={tema}
                    onAdicionarProduto={(produto) => {
                        setTela("Produtos");
                    }}
                    onCancelar={() => setTela("Produtos")}
                />
            )}

            {tela === "Serviços" && (
                <ListaServico tema={tema} servicos={servicos} setServicos={setServicos} />
            )}
            {tela === "Cadastrar Serviço" && (
                <FormularioCadastroServico
                    tema={tema}
                    onAdicionarServico={(servico) => {
                        setTela("Serviços");
                    }}
                    onCancelar={() => setTela("Serviços")}
                    onCadastrar={() => setTela("Serviços")}
                />
            )}
            {tela === "Registrar Venda" && (
                <RegistroVendas />
            )}
            {tela === "Relatórios" && (
                <ConsultaVendas />
            )}
        </>
    );
}

