export default function Home() {
  const routes = [
    { route: "GET '/'", description: "Retorna uma mensagem de teste indicando que a API está funcionando." },
    { route: "POST 'user'", description: "Cria um novo usuário se o mesmo não existir." },
    { route: "GET 'user'", description: "Lista todos os usuários cadastrados." },
    { route: "GET 'user/page/:page'", description: "Lista os usuários de forma paginada." },
    { route: "POST 'tasks'", description: "Cria uma nova tarefa para um usuário existente." },
    { route: "GET 'tasks/user/:userId'", description: "Lista as tarefas de um usuário específico (sem paginação)." },
    { route: "GET 'tasks'", description: "Lista todas as tarefas com os detalhes do usuário associado." },
    { route: "GET 'tasks/page/:page'", description: "Lista todas as tarefas de forma paginada, incluindo os dados do usuário." },
    { route: "GET 'tasks/page/:idUser/:page'", description: "Lista as tarefas de um usuário específico de forma paginada." },
    { route: "POST 'login'", description: "Realiza o login do usuário validando usuário e senha." },
    { route: "GET 'tasks/:taskId'", description: "Retorna os detalhes de uma tarefa específica." },
    { route: "POST 'tasks/complete'", description: "Marca uma tarefa como completa." },
    { route: "DELETE 'tasks/:taskId'", description: "Deleta uma tarefa pelo seu ID." },
    { route: "PUT 'tasks/:taskId'", description: "Atualiza os dados de uma tarefa existente." },
  ];

  return (
    <main className="min-h-screen bg-gray-100 dark:bg-gray-900 py-10 px-6 md:px-16 text-gray-800 dark:text-gray-100">
      <div className="max-w-5xl mx-auto space-y-10">

        <section>
          <h1 className="text-4xl font-bold mb-4 text-blue-600 dark:text-blue-400">Recursos Adicionados</h1>
        </section>

        <section className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-4 border-b pb-2">Rotas disponíveis na API</h2>
          <ul className="space-y-2">
            {routes.map((item, index) => (
              <li key={index} className="border-l-4 border-blue-500 pl-3">
                <p>
                  <span className="font-semibold text-blue-600 dark:text-blue-400">{item.route}</span>:{" "}
                  <span>{item.description}</span>
                </p>
              </li>
            ))}
          </ul>
        </section>

        <section className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-4 border-b pb-2">NextJS (Front)</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>
              <span className="font-semibold">Usuário</span>
              <ul className="list-disc list-inside ml-6 space-y-1">
                <li>Cadastro de Usuário</li>
                <li>Login de Usuário</li>
                <li>Logout de Usuário</li>
                <li>Listagem de Usuários</li>
                <li>Armazena dados do usuário no localStorage</li>
                <li>Verifica autenticação do usuário</li>
                <li>Proteção de rotas</li>
                <li>Botão de logout visível apenas para usuários logados</li>
              </ul>
            </li>
            <li>
              <span className="font-semibold">Tarefas</span>
              <ul className="list-disc list-inside ml-6 space-y-1">
                <li>Cadastro de Tarefas</li>
                <li>Edição de Tarefas</li>
                <li>Exclusão de Tarefas</li>
                <li>Listagem de Tarefas de todos os usuários</li>
                <li>Listagem de Tarefas do Usuário logado</li>
              </ul>
            </li>
            <li>Usando o React Toastify para mensagens do servidor</li>
            <li>Layout responsivo</li>
            <li>Estilização com Tailwind CSS</li>
            <li>Componentes: Header, Footer, Navbar, Modal, Paginação</li>
          </ul>
        </section>

        <section className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-4 border-b pb-2">NestJS (Back)</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>
              <span className="font-semibold">Usuário</span>
              <ul className="list-disc list-inside ml-6 space-y-1">
                <li>Cadastro de Usuário</li>
                <li>Login de Usuário</li>
                <li>Logout de Usuário</li>
                <li>Listagem dos Usuários</li>
                <li>Listagem de Usuários com paginação</li>
              </ul>
            </li>
            <li>
              <span className="font-semibold">Tarefas</span>
              <ul className="list-disc list-inside ml-6 space-y-1">
                <li>Cadastro de Tarefas</li>
                <li>Listagem de Tarefas de todos os usuários</li>
                <li>Listagem de Tarefas do Usuário logado</li>
                <li>Listagem de Tarefas com paginação</li>
                <li>Listagem de Tarefas do Usuário logado com paginação</li>
                <li>Listagem de Tarefas de um usuário específico</li>
                <li>Listagem de Tarefas de um usuário específico com paginação</li>
                <li>Listagem de Tarefas com detalhes do usuário</li>
                <li>Listagem de Tarefas de um usuário específico com detalhes do usuário</li>
                <li>Listagem de Tarefas com detalhes do usuário e paginação</li>
                <li>Listagem de Tarefas de um usuário específico com detalhes do usuário e paginação</li>
                <li>Exclusão de Tarefas</li>
                <li>Atualização de Tarefas</li>
                <li>Marcação de Tarefas como completas</li>
              </ul>
            </li>
            <li>Prisma ORM</li>
            <li>SQLite</li>
            <li>Class-validator</li>
          </ul>
        </section>

        <section className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-4 border-b pb-2">O que eu sei implementar mas fui limitado pelo tempo</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>
              <span className="font-semibold">Autenticação</span>
              <ul className="list-disc list-inside ml-6 space-y-1">
                <li>Autenticação por Oauth2 ou JWT</li>
                <li>Uso de Cookies para maior segurança da seção</li>
                <li>Uso de Refresh Token</li>
              </ul>
            </li>
            <li>
              <span className="font-semibold">Usuário</span>
              <ul className="list-disc list-inside ml-6 space-y-1">
                <li>Recuperação de Senha</li>
                <li>Ativação via Email/WhatsApp ou qualquer outro</li>
                <li>Verificação em 2 fatores (2FA)</li>
              </ul>
            </li>
            <li>
              <span className="font-semibold">Servidor</span>
              <ul className="list-disc list-inside ml-6 space-y-1">
                <li>Uso de Middlewares para verificação de autenticação</li>
                <li>Validação de campos de forma mais precisa</li>
                <li>Uso de Docker para automatização de construção dos servidores</li>
                <li>Controllers separados</li>
                <li>Uso de repository</li>
                <li>Consumo de API externa, como para consulta de CEP e etc</li>
                <li>Criptografia de senha ao armazenar no banco</li>
                <li>Uso de hash nas rotas para camuflar ID do item no banco</li>
                
              </ul>
            </li>
            <li>Entre outros recursos que necessitam de mais tempo para implementação</li>
          </ul>
        </section>



      </div>
    </main>
  );
}
