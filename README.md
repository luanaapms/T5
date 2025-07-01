# ATVV-WB
Trabalho prático da disciplina Programação Orientada a Objetos, lecionada pelo professor [Gerson da Penha Neto](https://github.com/gerson-pn).

## Atividade:
Agora chegou o momento aguardado por todos, o desenvolvimento de um projeto com front-end e back-end completos. O
objetivo final da empresa para enfim ter um produto moderno e pronto para enfrentar qualquer concorrência
futura. O objetivo final é criar uma aplicação web, na abordagem SPA, que atenda a todos os requisitos que o sistema
precisa ter, para atender aos clientes da WB. Os requisitos foram descritos na atvi, a primeira atividade que
deu origem a empresa de desenvolvimento de software. 


## Instalação e execução

- Clone o repositório:
    ```bash
    git clone <https://github.com/luanaapms/T5.git>
    ```

- Navegue até o diretório do projeto:
    ```bash
    cd atvv-wb
    ```

### Back-end

1. Acesse:
    ```bash
    cd backend
    ```

2. Instale as dependências:
    ```bash
    npm install
    ```

3. Configure o arquivo .env na raiz da pasta backend com as credenciais do seu banco MySQL:
 ```bash
    DB_HOST=localhost
    DB_USER=root
    DB_PASSWORD=sua_senha_mysql
    DB_NAME=WorldBeauty
    PORT=3001
 ```

4. Inicie a aplicação:
    ```bash
    node server.js
    ```

### Front-end

1. Acesse:
    ```bash
    cd frontend
    ```

2. Instale as dependências:
    ```bash
    npm install
    ```
    
3. Inicie a aplicação:
    ```bash
    npm start
     ```

O projeto será executado em http://localhost:3000.


## Tecnologias Utilizadas:

- TypeScript
- React
- Node.js
- MySQL
