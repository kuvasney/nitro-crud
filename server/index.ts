import { Nitro } from 'nitropack';
import mongoose from 'mongoose';

export default async (_nitroApp: Nitro) => {
  const config = useRuntimeConfig()
  try {
    // await mongoose.connect(`mongodb://localhost:27017/Nitro`)
    await mongoose.connect(`mongodb+srv://${config.MONGODB_USERNAME}:${config.MONGODB_PASSWORD}@cluster0.kus5n.mongodb.net/jessicasaka?retryWrites=true&w=majority&appName=Cluster0`)

    console.log('Conexão com DB realizada');
  } catch (err) {
    console.log('Erro ao conectar com o MongDB', err);
  }
}

