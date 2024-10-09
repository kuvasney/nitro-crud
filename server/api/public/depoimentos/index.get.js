import { DepoimentosModel } from "../../depoimentos/model"

export default defineEventHandler(async (event) => {
  try {
    const data = await DepoimentosModel.find()

    return {
      data
    }
  } catch (err) {
    return {
      error: 'Não foi possível trazer os depoimentos ' + err.message
    }
  }
})
