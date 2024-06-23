# StudentFlow Frontend

Bem-vindo ao StudentFlow Frontend. Este projeto é a interface do usuário para gerenciar informações de estudantes, conectando-se à StudentFlow API. A aplicação foi desenvolvida utilizando React e outras tecnologias de frontend modernas.

## Stack utilizada

**Front-end:** React e Context API

## Funcionalidades

- Interface amigável para operações CRUD (Criar, Ler, Atualizar e Deletar) sobre estudantes.
- Integração com a StudentFlow API para autenticação e autorização de usuários e logout.
- Formulários e validações para entrada de dados do usuário.
- Tema dark bom background dinâmico para uma melhor experiência do usuário.
- Navegação entre diferentes seções da aplicação.

## Instalação

Para configurar e rodar o **StudentFlow Frontend**, siga os passos abaixo:

### Pré-requisitos

Certifique-se de ter as seguintes ferramentas instaladas em seu sistema:

- [Node.js](https://nodejs.org/) (versão 14 ou superior)
- [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/getting-started)

### Passo a Passo

1. **Clone o repositório**

   Clone o repositório do frontend para seu ambiente local:

   ```bash
   git clone https://github.com/adrianogui02/StudentFlow_frontend.git
   ```

1. **Navegue até o diretório do projeto**

   Entre no diretório do projeto clonado:

   ```bash
   cd StudentFlow_frontend
   ```

1. **Configuração do Ambiente**

   Crie um arquivo .env na raiz do projeto com o seguinte conteúdo:

   ```bash
   REACT_APP_API_URL=http://localhost:3005/api
   ```

   Este arquivo define a URL base para a StudentFlow API.

1. **Usando Docker**

   Se preferir usar Docker, você pode seguir os passos abaixo para configurar e rodar o frontend usando Docker e Docker Compose:

   - Construa e Inicie os containers:

     ```bash
     docker-compose up -d --build
     ```

     Isso irá iniciar o serviço do fronend na porta 3000

   - Verifique os logs dos containers:

     ```bash
     docker-compose logs -f
     ```

     Verifique se não há erros na inicialização e que o frontend esta funcionando corretamente.

1. **Rodando Localmente (Sem Docker)**

Se você optar por rodar a aplicação localmente sem Docker, siga os passos abaixo:

- Instale as dependências:

  ```bash
  npm install
  ou
  yarn
  ```

- Inicie a aplicação:

  ```bash
  npm start
  ou
  yarn start

  ```

## Screenshots

### Página de Login

![App Screenshot](https://imgur.com/wWalDuc.png)

### Página de Cadastro

![App Screenshot](https://imgur.com/KN2ijCu.png)

### Página de Home

![App Screenshot](https://imgur.com/geYGbtU.png)

### Página de Estudantes

![App Screenshot](https://imgur.com/w1wQMgD.png)

## Autores

[@adrianogui02](https://github.com/adrianogui02)

## Licença

[MIT](https://choosealicense.com/licenses/mit/)
