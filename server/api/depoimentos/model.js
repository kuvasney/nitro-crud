import { Schema, model } from "mongoose"

const depoimentosSchema = new Schema({
  nome: {
    type: String,
    required: [true, 'Nome é um campo obrigatório']
  },
  referencia: {
    type: String,
    required: false
  },
  depoimento: {
    type: String,
    required: [true, 'Depoimento é um campo obrigatório']
  }
},
  {
    timestamp: true
  }
)

export const DepoimentosModel = model('Depoimentos', depoimentosSchema)

