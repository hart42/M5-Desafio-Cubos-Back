const yup = require('./yup');

const cadstroCobrancasSchema = yup.object().shape({
  descricao: yup.string(),
  valor: yup.number(),
  vencimento: yup.date(),
  status: yup.string()
});

module.exports = cadstroCobrancasSchema;
