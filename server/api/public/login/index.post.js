import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import { UsuariosModel } from '../../usuarios/model';

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  try {
    // Capturar os dados do corpo da requisição (nome, email, senha)
    const body = await readBody(event);
    const { email, password } = body;
    const existingUser = await UsuariosModel.findOne({ email });

    if (!existingUser) {
      setResponseStatus(event, 401);
      return {
        statusCode: 401,
        message: 'Usuário não existe.'
      }
    }

    const passwordMatch = await bcrypt.compare(password, existingUser.password);
    if (!passwordMatch) {
      setResponseStatus(event, 401);
      return {
        statusCode: 401,
        message: 'Senha inválida'
      }
    }

    console.log('config.JWT_SECRET', config.JWT_SECRET);
    // Generate JWT token
    const token = jwt.sign({ email: existingUser.email }, config.JWT_SECRET);
    setResponseStatus(event, 200)
    return {
      token: token
    }
  } catch(err) {
    setResponseStatus(event, 500);
    return {
      statusCode: 500,
      message: `Erro ao fazer login: ${err.message}`
    };
  }
})
