#!/bin/sh

CONTAINERS="frontend-gerenciador-tarefas
backend-gerenciador-tarefas"


# Parar os containers
for container in $CONTAINERS; do
  if docker ps --format '{{.Names}}' | grep -w "$container" > /dev/null; then
    echo "Parando container: $container"
    docker stop "$container"
  else
    echo "Container '$container' não encontrado."
  fi
done

# Remover containers
for container in $CONTAINERS; do
  if docker ps -a --format '{{.Names}}' | grep -w "$container" > /dev/null; then
    echo "Removendo container: $container"
    docker rm -f "$container"
  else
    echo "Container '$container' não encontrado."
  fi
done

echo "Remoção concluída."



# Remover is diretorios dist e node_modules
FRONTEND_DIR="front-next-crud-gerenciador-de-tarefas"
BACKEND_DIR="nest-crud-gerenciador-de-tarefas"

delete_dirs() {
  local dir=$1
  echo "Entrando na pasta: $dir"
  cd "$dir" || { echo "Erro: não foi possível acessar $dir"; exit 1; }

  for folder in dist node_modules; do
    if [ -d "$folder" ]; then
      echo "Removendo $folder em $dir"
      sudo rm -rf "$folder"
    else
      echo "Pasta $folder não encontrada em $dir"
    fi
  done

  cd - > /dev/null
}

delete_dirs "$FRONTEND_DIR"
delete_dirs "$BACKEND_DIR"

echo "Limpeza concluída."