# Etapa 1: build
FROM node:22 AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Etapa 2: produção
FROM node:22

WORKDIR /app

COPY --from=builder /app ./

EXPOSE 3000

# CMD ["npm", "run", "start:prod"]
CMD ["npm", "run", "start:dev"]
