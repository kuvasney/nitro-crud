import { ObrasModel } from "../../obras/model"

export default defineEventHandler(async (event) => {
  try {
    const data = await ObrasModel.find()

    return {
      data
    }
  } catch(err) {
    return {
      error: err.message
    }
  }
})
