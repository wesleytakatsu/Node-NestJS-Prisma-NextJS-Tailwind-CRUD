#!/bin/sh

# compatível somente com alguns sistemas operacionais Linux geralmente GNOME como Ubuntu
# pois abre cada servidor em um novo terminal

# Eu criei algumas verificações para que tudo funcione bem. Se quiser, comente o que não precisa.

BACKEND_DIR="nest-crud-gerenciador-de-tarefas"
FRONTEND_DIR="front-next-crud-gerenciador-de-tarefas"


if ! command -v node >/dev/null 2>&1; then
    echo "Node.js não está instalado. Por favor, instale o Node.js e tente novamente."
    exit 1
fi

if ! command -v npm >/dev/null 2>&1; then
    echo "npm não está instalado. Por favor, instale o npm e tente novamente."
    exit 1
fi

check_permissions() {
    local project_dir=$1
    for folder in "dist" "node_modules"; do
        if [ -d "$project_dir/$folder" ] && [ ! -w "$project_dir/$folder" ]; then
            echo "Você não tem permissão para modificar a pasta '$folder' em $project_dir."
            echo "Por favor, execute o comando 'sh mudar-do-container-para-local-e-vice-versa.sh' para corrigir isso."
            echo "Após isso, execute novamente o script 'iniciar_os_projetos_sem_docker.sh'."
            exit 1
        fi
    done
}

check_permissions "$BACKEND_DIR"
check_permissions "$FRONTEND_DIR"



echo "==== Back-end: $BACKEND_DIR ===="
cd "$BACKEND_DIR" || { echo "Erro ao acessar $BACKEND_DIR"; exit 1; }

echo "Instalando dependências do backend..."
npm install
npm install --save @nestjs/swagger
npx prisma generate
npm run build

echo "Iniciando o servidor NestJS em novo terminal..."
gnome-terminal -- bash -c "cd $(pwd); npm run start:dev; echo; read -p 'Pressione ENTER para fechar este terminal...'"

cd ..

echo "==== Front-end: $FRONTEND_DIR ===="
cd "$FRONTEND_DIR" || { echo "Erro ao acessar $FRONTEND_DIR"; exit 1; }

echo "Instalando dependências do frontend..."
npm install

echo "Iniciando o servidor Next.js em novo terminal..."
gnome-terminal -- bash -c "cd $(pwd); npm run dev; echo; read -p 'Pressione ENTER para fechar este terminal...'"

echo
echo "Todos os processos foram iniciados."
echo "Você pode acompanhar os logs nos terminais abertos."
echo

