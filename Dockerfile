# Usar a imagem oficial do Node.js obs: na versão 18-alpine não funcionou o POST e a versao 18 completa tornou a máquina instável
FROM node:16

# Definir diretório de trabalho dentro do container
WORKDIR /usr/src/app

# Copiar os arquivos de dependências para o container
COPY package*.json ./

# Instalar as dependências do projeto
RUN npm install

# Copiar o restante dos arquivos da aplicação para o container
COPY . .

# Rodar o build da aplicação Nuxt 3 com Nitro
RUN npm run build

# Expor a porta que o Nuxt 3 vai rodar (Nitro roda na 3000 por padrão)
EXPOSE 3000


CMD ["node", ".output/server/index.mjs"]

