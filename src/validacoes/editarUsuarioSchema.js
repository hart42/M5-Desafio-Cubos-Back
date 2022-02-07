const yup = require('./yup');

const editarUsuarioSchema = yup.object().shape({
  email: yup
    .string()
    .email()
    .required(),
    
  nome: yup
    .string()
    .required()
});

module.exports = editarUsuarioSchema;