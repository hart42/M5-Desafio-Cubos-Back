const yup = require('./yup');

const cadastroClienteSchema = yup.object().shape({
  email: yup
    .string()
    .email()
    .required(),

  cpf: yup
    .string().
    required(),

  nome: yup
    .string()
    .required(),

  telefone: yup
    .string()
    .required()
});

module.exports = cadastroClienteSchema;