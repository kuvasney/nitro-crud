# nitro-crud
## Um CRUD feito em VueJS + Nitro

Para iniciar:

 - git clone https://github.com/kuvasney/nitro-crud.git
 - cd nitro-crud
 - no Terminal, gere um JWT_SECRET (comando openssl rand -base64 32)
 - crie um arquivo .env na raiz, seguindo o exemplo do arquivo env.example
 - copie o JWT_SECRET gerado no Terminal na chave JWT_SECRET, substituindo seu valor pelo hash copiado
 - npm install
 - npm run build
 - docker-compose -f docker-compose.yaml up --build

Após a montagem do container, a aplicação ficará disponível em http://localhost:3000 e a api em http://localhost:3000/api

Para criar o primeiro usuário, faça um post no endpoint http://localhost:3000/api/public/criarUsuario contendo nome, email e password. Exemplo:

```json
{
    "nome": "Admin",
    "email": "contato@rafael.abc.br",
    "password": "1234567"
}
´´´

Depois, basta logar pelo endpoint http://localhost:3000/api/public/login

