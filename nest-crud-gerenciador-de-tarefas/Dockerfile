# Etapa 1: build
FROM node:22 AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npx prisma generate
RUN npm run build

# Etapa 2: produção
FROM node:22

WORKDIR /app

COPY --from=builder /app ./

# Instala globalmente o Nest CLI para que o comando "nest" esteja disponível
RUN npm install --save @nestjs/swagger

EXPOSE 3000

# CMD ["npm", "run", "start:prod"]
CMD ["npm", "run", "start:dev"]
