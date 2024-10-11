import { Nitro } from 'nitropack';
import mongoose from 'mongoose';

export default async (_nitroApp: Nitro) => {
  const mongoUri = process.env.MONGODB_CONNECT_DOCKER || 'mongodb://mongo:27017/Nitro';
  console.log('mongoUri ===> ', mongoUri);

  const config = useRuntimeConfig()
  try {
    await mongoose.connect(mongoUri)

    console.log('Conexão com DB realizada');
  } catch (err) {
    console.log('Erro ao conectar com o MongoDB', err);
  }
}

