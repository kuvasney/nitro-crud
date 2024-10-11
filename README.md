# nitro-crud
## Um CRUD feito em VueJS + Nitro

Para iniciar:

 - Clonar o repositório
 ```bash
 git clone https://github.com/kuvasney/nitro-crud.git
 ```
 - acesse a pasta
 ```bash
 cd nitro-crud
 ```
 - no Terminal, gere uma chave aleatória
  ```bash
  openssl rand -base64 32
  ```
 - crie um arquivo .env na raiz, seguindo o exemplo do arquivo env.example
 ```bash
NUXT_ENV_API=/api
MONGODB_CONNECT_CLOUD= #o endereco do mongodb cloud caso tenha um
MONGODB_CONNECT_DOCKER=mongodb://mongo:27017/Nitro #se quiser usar um db diferente, basta alterar aqui
MONGODB_CONNECT_LOCAL=mongodb://localhost:27017/Nitro #caso queria rodar o projeto localmente, altere em server/index.ts de MONGODB_CONNECT_DOCKER para MONGODB_CONNECT_LOCAL
EMAIL_USER=EMAIL@HOST.COM #o e-mail de envio para o formulário de contato
EMAIL_PWD=EMAILPASSWORD #o password do email de envio
EMAIL_HOST=mail.HOST.com #o host do email de envio
JWT_SECRET= #a chave aleatório que será criada
 ```
 - copie a chave aleatória gerado no Terminal na chave JWT_SECRET, substituindo seu valor pela chave copiada
 - instale as depêndencias
 ```bash
 npm install
 ```
 - faça o build inicial da aplicação, para gerar a pasta .output
 ```bash
 npm run build
 ```
 - rode o docker-compose
 ```bash
 docker-compose -f docker-compose.yaml up --build
 ```

Após a montagem do container, a aplicação ficará disponível em http://localhost:3000 e a api em http://localhost:3000/api

Para criar o primeiro usuário, faça um post no endpoint http://localhost:3000/api/public/criarUsuario contendo nome, email e password. Exemplo:

```json
{
    "nome": "Admin",
    "email": "contato@rafael.abc.br",
    "password": "1234567"
}
```

Depois, basta logar pelo endpoint http://localhost:3000/api/public/login

