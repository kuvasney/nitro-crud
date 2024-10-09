import { UsuariosModel } from './model'
import authMiddleware from '../../middleware/auth';

export default defineEventHandler(async (event) => {
  try {
    // Aplica o middleware para verificar o token JWT
    // await authMiddleware(event);

    // Capturar os dados do corpo da requisição (nome, email, senha)
    const body = await readBody(event);
    const { nome, email, password } = body;


    // Validar se todos os campos foram enviados
    if (!nome || !email || !password) {
      setResponseStatus(event, 400);
      return {
        statusCode: 400,
        message: 'Nome, email e senha são obrigatórios.'
      };
    }

    // Verificar se o email já está cadastrado
    const existingUser = await UsuariosModel.findOne({ email });
    if (existingUser) {
      setResponseStatus(event, 400);
      return {
        statusCode: 400,
        message: 'Este email já está em uso.'
      };
    }

    // Criar um novo usuário e salvar no banco de dados
    const newUser = new UsuariosModel({
      nome,
      email,
      password
    });

    await newUser.save();

    return {
      statusCode: 201,
      message: 'Usuário criado com sucesso',
      data: {
        nome: newUser.nome,
        email: newUser.email
      }
    }

  } catch (error) {
    setResponseStatus(event, 500);
    return {
      statusCode: 500,
      message: `Erro ao criar usuário: ${error.message}`
    };
  }
})
