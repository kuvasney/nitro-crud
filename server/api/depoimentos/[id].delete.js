import { DepoimentosModel } from "./model"
import authMiddleware from '../../middleware/auth';

export default defineEventHandler(async (event) => {
  // Aplica o middleware de autenticação
  await authMiddleware(event);

  try {
    const depoimentoId = event.context.params.id; // Pega o ID da depoimento da URL

    if (!depoimentoId) {
      setResponseStatus(event, 400);
      return { message: 'ID depoimento é obrigatório.' };
    }

    // Tenta deletar a depoimento no banco de dados
    const deletedDepoimento = await DepoimentosModel.findByIdAndDelete(depoimentoId);

    // Verifica se a depoimento foi encontrado e deletado
    if (!deletedDepoimento) {
      setResponseStatus(event, 404);
      return { message: 'Depoimento não encontrada.' };
    }

    return {
      message: 'Depoimento com sucesso.',
      depoimento: deletedDepoimento // Opcional, pode retornar a depoimento deletado
    };
  } catch (err) {
    setResponseStatus(event, 500);
    return { message: 'Erro ao tentar deletar Depoimento.', error: err.message };
  }
})
