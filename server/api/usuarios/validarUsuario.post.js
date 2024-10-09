import { UsuariosModel } from './model'
import authMiddleware from '../../middleware/auth';

export default defineEventHandler(async (event) => {
  try {
    // Aplica o middleware para verificar o token JWT
    await authMiddleware(event);

    // Capturar os dados do corpo da requisição
    const body = await readBody(event);
    const ususarioValido = await UsuariosModel.findOne({ email: body.email })
    if (ususarioValido) {
      setResponseStatus(event, 200);
      return true
    } else {
      setResponseStatus(event, 401);
      return false
    }
  } catch (err) {
    setResponseStatus(event, 401);
    return false
  }
})
