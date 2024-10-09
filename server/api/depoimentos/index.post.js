import { DepoimentosModel } from './model';
import authMiddleware from '../../middleware/auth';

export default defineEventHandler(async (event) => {
  console.log('depoimentos', );
  try {
    // Aplica o middleware para verificar o token JWT
    await authMiddleware(event);

    // Capturar os dados do corpo da requisição (nome, email, senha)
    const body = await readBody(event);
    const { nome, referencia, depoimento } = body;

    // Criar um novo depoimento e salvar no banco de dados
    const newDepoimento = new DepoimentosModel({
      nome,
      referencia,
      depoimento
    });

    await newDepoimento.save()

    setResponseStatus(event, 201)
    return {
      statusCode: 201,
      message: 'Depoimento cadastrado com sucesso',
      data: newDepoimento
    }
  } catch(err) {
    setResponseStatus(event, 500);
    return {
      statusCode: 500,
      message: `Erro ao criar depoimento: ${err.message}`
    };
  }
})
