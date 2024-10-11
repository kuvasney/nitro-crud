import { UsuariosModel } from '../usuarios/model'

export default defineEventHandler(async (event) => {
  try {
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
