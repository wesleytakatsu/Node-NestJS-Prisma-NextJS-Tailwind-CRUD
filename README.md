# Projeto simples de tarefas de usuário em Node, NestJS e NextJS usando Prisma ORM, Tailwind CSS e outros.

![Takatsu's Projects](https://wesleytakatsu.github.io/Pagina-Apresentacao-Pessoal/media/img/Logo-Takatsu-Projetos.png)

## Meu nome é Wesley Sieiro Takatsu de Araujo
[Visite meu LinkedIn](https://www.linkedin.com/in/wesleytakatsu/)

## Tecnologias usadas:
Servidores em NodeJS  
Docker  
  
Backend:
- NestJS Framework
- Prisma ORM
- Rotas APIRest com class-validator
- SQLite
  
Frontend:
- NextJS Framework
- Tailwind CSS
- Typescript
- LocalStorage


## Observações do projeto
- Testei todas as rotas com o Insomnia e com o Swagger, com sucesso tanto rodando direto, quanto pelo Docker
- Usei os modelos do formulário e a tabela de listagem estilizados pegos na internet e fiz alterações para adaptar ao projeto e acelerar o processo de desenvolvimento, já que o estilo não era o objetivo principal, mas ajuda no uso do sistema.
- Todas as funções, métodos, classes, rotas, controllers e demais componentes e etc foram criadas do zero por mim, sem reaproveitamento de código externo.

## 🚀 Instalação
- Certifique-se de ter o **Docker** e o **Docker Compose** instalados na sua máquina **ou** o **Node.js atualizado** (foi utilizada a versão `22` durante o desenvolvimento).

### Docker:
  - Execute: `docker-compose up --build` (primeira vez)  
  - Para rodar novamente: `docker-compose up -d`  
  - Para desligar: `docker-compose down` ou utilize o **Docker Desktop** se estiver instalado.  
  

### Serviços individuais:  
  - Na pasta do NestJS (backend)  
  `npm install`  
  `npm install --save @nestjs/swagger`  
  `npx prisma generate`  
  `npm run build`  
  `npm run start:dev`  
  
  - Na pasta do NextJS (Frontend):  
  `npm install`  
  `npm run dev`  

### Caso queira mudar entre o docker e os serviços individuais rode o script `sh mudar-do-container-para-local-e-vice-versa.sh` que deve pedir a senha sudo para deletar as pastas 'dist' e 'node_modules' que ficam com permissões do Docker e vice versa, também remove os containers construídos antes de iniciar de forma diferente.  
  
  

# 📘 Recursos Adicionados

## 🔍 Observações

> ✅ Swagger foi implementado e está disponível em: `http://127.0.0.1:3000/api`  
> ✅ Pode rodar em Docker ou diretamente cada serviço, mas inicie o servidor NestJS primeiro  
> ✅ As portas utilizadas são **3000** para o backend e **3001** para o frontend  

---

## 📡 Rotas disponíveis na API

| Método e Rota                         | Descrição                                                                 |
|--------------------------------------|---------------------------------------------------------------------------|
| `POST 'user'`                        | Cria um novo usuário se o mesmo não existir.                             |
| `GET 'user'`                         | Lista todos os usuários cadastrados.                                     |
| `GET 'user/page/:page'`             | Lista os usuários de forma paginada.                                     |
| `POST 'tasks'`                       | Cria uma nova tarefa para um usuário existente.                          |
| `GET 'tasks/user/:userId'`          | Lista as tarefas de um usuário específico (sem paginação).              |
| `GET 'tasks'`                        | Lista todas as tarefas com os detalhes do usuário associado.            |
| `GET 'tasks/page/:page'`            | Lista todas as tarefas de forma paginada, incluindo os dados do usuário.|
| `GET 'tasks/page/:idUser/:page'`    | Lista as tarefas de um usuário específico de forma paginada.            |
| `POST 'login'`                       | Realiza o login do usuário validando usuário e senha.                   |
| `GET 'tasks/:taskId'`               | Retorna os detalhes de uma tarefa específica.                           |
| `POST 'tasks/complete'`             | Marca uma tarefa como completa.                                         |
| `DELETE 'tasks/:taskId'`            | Deleta uma tarefa pelo seu ID.                                          |
| `PUT 'tasks/:taskId'`               | Atualiza os dados de uma tarefa existente.                              |

---

## 🧩 Next.js (Frontend)

### 👤 Usuário

- Cadastro de Usuário
- Login de Usuário
- Logout de Usuário
- Listagem de Usuários
- Armazena dados do usuário no `localStorage`
- Verificação de autenticação do usuário
- Proteção de rotas
- Botão de logout visível apenas para usuários logados

### ✅ Tarefas

- Cadastro de Tarefas
- Edição de Tarefas
- Exclusão de Tarefas
- Listagem de Tarefas de todos os usuários
- Listagem de Tarefas do Usuário logado

### Outros

- Mensagens do servidor com **React Toastify**
- Layout responsivo
- Estilização com **Tailwind CSS**
- Componentes reutilizáveis: `Header`, `Footer`, `Navbar`, `Modal`, `Paginação`

---

## 🛠️ NestJS (Backend)

### 👤 Usuário

- Cadastro e Login
- Logout
- Listagem (com e sem paginação)

### ✅ Tarefas

- Cadastro de Tarefas
- Listagem de:
  - Todas as tarefas
  - Tarefas do usuário logado
  - Tarefas com paginação
  - Tarefas de um usuário específico (com e sem paginação)
  - Tarefas com detalhes do usuário (com e sem paginação)
- Exclusão, atualização e marcação de tarefas como completas

### Outros

- ORM: **Prisma**
- Banco de dados: **SQLite**
- Validação com `class-validator`
- Uso de **Docker** para automatizar os servidores
- Controllers organizados por domínio

---

## 🧠 O que pode ser implementado depois

### 🔐 Autenticação

- OAuth2 ou JWT
- Cookies para maior segurança da sessão
- Refresh Token

### 👥 Usuário

- Recuperação de senha
- Ativação por Email, WhatsApp, etc.
- Autenticação em dois fatores (2FA)

### 🖥️ Servidor

- Middlewares para autenticação
- Uso de repositories
- Consumo de APIs externas (ex: CEP)
- Criptografia de senhas no banco
- Uso de hash nas rotas para camuflar IDs

> 💡 Outros recursos podem ser adicionados para tornar o projeto ainda mais robusto, útil para estudos, testes e demonstrações.



