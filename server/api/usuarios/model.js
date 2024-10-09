import { Schema, model } from "mongoose"
import bcrypt from 'bcrypt';

const usuariosSchema = new Schema({
  nome: {
    type: String,
    required: [true, "nome deve ter ao menos 3 letras"],
    minlength: 3
  },
  email: {
    type: String,
    required: [true, 'email é obrigatório'],
    unique: true,  // O email deve ser único
    match: [/\S+@\S+\.\S+/, 'O email deve ser válido']
  },
  password: {
    type: String,
    required: [true, "password precisa ter pelo menos 7 caracteres"],
    minlength: 7
  }
},
  {
    timestamps: true
  }
)

// Método de pré-gravação para fazer hash da senha antes de salvar
usuariosSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    return next(error);
  }
});


export const UsuariosModel = model('Usuarios', usuariosSchema); // tabela Usuarios

