const yup = require('./yup');

const cadastroUsuarioSchema = yup.object().shape({
  email: yup
    .string()
    .email()
    .required(),

  senha: yup
    .string().min(6).
    required(),

  nome: yup
    .string()
    .required()
});

module.exports = cadastroUsuarioSchema;