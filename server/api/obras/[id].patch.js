import { ObrasModel } from "./model"
import authMiddleware from '../../middleware/auth';

export default defineEventHandler(async (event) => {
  // Aplica o middleware de autenticação
  await authMiddleware(event);
  const obraId = event.context.params.id; // Pega o ID da obra da URL
  const body = await readBody(event); // Captura o corpo da requisição PATCH

  if (!obraId) {
    setResponseStatus(event, 400);
    return { message: 'ID da obra é obrigatório.' };
  }
  try {

    // Tenta deletar a obra no banco de dados
    const updatedObra = await ObrasModel.findByIdAndUpdate(obraId, body, { new: true });

    // Verifica se a obra foi encontrada e deletada
    if (!updatedObra) {
      setResponseStatus(event, 404);
      return { message: 'Obra não encontrada.' };
    }

    return {
      message: 'Obra atualizada com sucesso.',
      obra: updatedObra // Opcional, pode retornar a obra deletada
    };
  } catch (err) {
    setResponseStatus(event, 500);
    return { message: 'Erro ao tentar atualizar a obra.', error: err.message };
  }
})
