import { Schema, model } from "mongoose"

const fotoSchema = new Schema({
  url: {
    type: String,
    required: true,
  },
  indice: {
    type: Number
  },
  descricaoFoto: {
    type: String
  },
  nomeArquivo: {
    type: String
  },
  referencia: {
    type: String
  }
});

const obrasSchema = new Schema({
  nome: {
    type: String,
    required: [true, "nome da obra é obrigatória"]
  },
  local: {
    type: String,
  },
  tipo: {
    type: String
  },
  descricao: {
    type: String,
    required: [true, 'descrição é obrigatório']
  },
  fotos: [fotoSchema],
  descricaoFoto: {
    type: Array,
    required: false,
  },
  fotoDestaque: {
    type: String,
    required: [true, "uma fotoDestaque é obrigatória"]
  }
},
  {
    timestamps: true
  }
)

export const ObrasModel = model('Obras', obrasSchema);
