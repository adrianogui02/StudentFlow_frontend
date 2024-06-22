# Use a imagem base oficial do Node.js com a versão LTS
FROM node:18 as build

# Defina o diretório de trabalho no container
WORKDIR /usr/src/app

# Copie o arquivo package.json e yarn.lock para o diretório de trabalho
COPY package*.json ./

# Instale as dependências do projeto
RUN yarn install

# Copie o restante dos arquivos do projeto para o diretório de trabalho
COPY . .

# Execute o build da aplicação
RUN yarn build

# Use uma imagem nginx para servir a aplicação em produção
FROM nginx:alpine

# Copie os arquivos de build para o diretório onde o Nginx servirá os arquivos
COPY --from=build /usr/src/app/build /usr/share/nginx/html

# Exponha a porta que o Nginx usará para servir a aplicação
EXPOSE 80

# Comando padrão para iniciar o Nginx
CMD ["nginx", "-g", "daemon off;"]
