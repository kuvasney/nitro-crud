import { ObrasModel } from "./model"
import authMiddleware from '../../middleware/auth';

export default defineEventHandler(async (event) => {
  // Aplica o middleware de autenticação
  await authMiddleware(event);

  try {
    const obraId = event.context.params.id; // Pega o ID da obra da URL

    if (!obraId) {
      setResponseStatus(event, 400);
      return { message: 'ID da obra é obrigatório.' };
    }

    // Tenta deletar a obra no banco de dados
    const deletedObra = await ObrasModel.findByIdAndDelete(obraId);

    // Verifica se a obra foi encontrada e deletada
    if (!deletedObra) {
      setResponseStatus(event, 404);
      return { message: 'Obra não encontrada.' };
    }

    return {
      message: 'Obra deletada com sucesso.',
      obra: deletedObra // Opcional, pode retornar a obra deletada
    };
  } catch (err) {
    setResponseStatus(event, 500);
    return { message: 'Erro ao tentar deletar a obra.', error: err.message };
  }
})
