import jwt from 'jsonwebtoken';

export default defineEventHandler(async (event) => {
  // Aplica o middleware apenas nas rotas da API
  if (event.node.req.url.startsWith('/api')) {
    // const publicRoutes = ['/api/public/login', '/api/public/obras', '/api/public/contato']; // Defina as rotas públicas

    // Verifica se a rota atual está na lista de rotas públicas
    if (event.node.req.url.includes('public')) {
      return; // Se for uma rota pública, não faz a verificação de token
    }

    let token = null

    if (event.node.req.headers['authorization']) {
      token = event.node.req.headers['authorization']?.split(' ')[1]; // Obtém o token do cabeçalho Authorization
    } else {
      token = false
    }


    if (!token) {
      setResponseStatus(event, 401);
      return {
        message: 'Acesso negado. Token não fornecido.'
      };
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      event.context.user = decoded;
    } catch (error) {
      setResponseStatus(event, 401);
      return {
        message: 'Token inválido ou expirado. ' + error.message
      };
    }
  }
});
