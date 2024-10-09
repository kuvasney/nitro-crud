import { UsuariosModel } from "./model"

export default defineEventHandler(async (event) => {
  try {
    const usuarios = await UsuariosModel.find()

    return {
      ...usuarios
    }
  } catch (err) {
    return {
      error: 'Não foi possível trazer os usuarios ' + err.message
    }
  }
})
