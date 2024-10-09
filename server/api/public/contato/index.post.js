import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: 465,
  // secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PWD
  }
})

export default defineEventHandler(async (event) => {
  const body = await readBody(event); // Captura o corpo da requisição PATCH
  try {
    const info = await transporter.sendMail({
      from: `${body.nome} <${body.email}>`,
      to: process.env.EMAIL_USER, // Destinatário(s)
      subject: `Mensagem via formulário de contato de ${body.nome}`,
      text: body.mensagem
      // html: '<b>Texto em HTML</b>' // Texto em formato HTML
    });
    setResponseStatus(200)
    return {
      message: 'Mensagem enviada com sucesso'
    }
  } catch (err) {
    setResponseStatus(500)
    return {
      message: 'Erro ao enviar a mensagem ', erro: err.message
    }
  }
})
