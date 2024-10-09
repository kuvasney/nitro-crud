import { ObrasModel } from "./model";
import multer from 'multer';
import { defineEventHandler, readBody, setResponseStatus } from 'h3';
import path from 'path';
import authMiddleware from '../../middleware/auth';

// Configuração de armazenamento
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(process.cwd(), 'public/uploads/obras')); // Mantenha uploads organizados
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});


// Configuração do Multer
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 10, // 10MB
    files: 5 // Limite de 5 arquivos
  },
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|webp/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

    if (mimetype && extname) {
      return cb(null, true);
    }
    cb(new Error("Apenas imagens no formato JPEG, JPG ou PNG são permitidas."));
  }
}).array('fotos', 10); // Máximo 5 fotos

// Handler para processar a requisição POST
export default defineEventHandler(async (event) => {
  // Aplica o middleware de autenticação
  await authMiddleware(event);

  try {
    // Usa Multer para fazer o upload
    await new Promise((resolve, reject) => {
      upload(event.node.req, event.node.res, (err) => {
        if (err instanceof multer.MulterError) {
          return reject({ status: 400, message: err.message });
        } else if (err) {
          return reject({ status: 500, message: "Erro no servidor: " + err.message });
        }
        resolve();
      });
    });

    // Pega os dados do FormData após o upload
    const body = event.node.req.body; // Isso deve pegar os dados corretamente

    const { nome, descricao, local, tipo, fotoDestaque } = body;

    if (!event.node.req.files || event.node.req.files.length === 0) {
      throw { status: 400, message: 'Nenhum arquivo foi enviado.' };    }

    const filePaths = event.node.req.files.map((file, index) => ({
      nomeArquivo: file.filename,
      url: file.path,
      descricaoFoto: String(body.descricaoFoto[index]) || '',
      indice: index,
      destaque: index === Number(fotoDestaque) // Marca a foto de destaque
    }));

    const novaObra = new ObrasModel({
      nome: String(nome),
      descricao: String(descricao),
      local: String(local),
      tipo: String(tipo),
      fotoDestaque: String(fotoDestaque),
      fotos: filePaths
    });

    // Salva no banco de dados
    await novaObra.save();

    return {
      message: 'Upload realizado com sucesso.',
      obra: novaObra
    };
  } catch (error) {
    setResponseStatus(event, error.status || 500);
    return { message: error.message || "Erro inesperado." };
  }
});
