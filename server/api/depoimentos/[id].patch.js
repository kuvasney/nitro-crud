import { DepoimentosModel } from "./model"
import authMiddleware from '../../middleware/auth';

export default defineEventHandler(async (event) => {
  // Aplica o middleware de autenticação
  await authMiddleware(event);
  const depoimentoId = event.context.params.id; // Pega o ID do depoimento da URL
  const body = await readBody(event); // Captura o corpo da requisição PATCH

  if (!depoimentoId) {
    setResponseStatus(event, 400);
    return { message: 'ID do depoimento é obrigatório.' };
  }
  try {

    // Tenta encontrar o depoimento no banco de dados
    const updatedDepoimento = await DepoimentosModel.findByIdAndUpdate(depoimentoId, body, { new: true });

    // Verifica se o depoimento foi encontrado
    if (!updatedDepoimento) {
      setResponseStatus(event, 404);
      return { message: 'Depoimento não encontrado.' };
    }

    return {
      message: 'Depoimento atualizado com sucesso.',
      depoimento: updatedDepoimento // Opcional, pode retornar o depoimento deletado
    };
  } catch (err) {
    setResponseStatus(event, 500);
    return { message: 'Erro ao tentar atualizar o depoimento.', error: err.message };
  }
})
