const res = require('express/lib/response');
const knex = require('../bancoDeDados/conexao');
const cadstroCobrancasSchema = require('../validacoes/cadastroCobrancaSchema');
const editarCobrancaSchema = require('../validacoes/editarCobrancaSchema');

const cadastrarCobranca = async (req, res) => {
  const { idcliente, descricao, valor, vencimento, status } = req.body;

  try {
    await cadstroCobrancasSchema.validate(req.body);

    const cobranca = await knex('cobrancas')
      .insert({
        idcliente,
        descricao,
        valor,
        vencimento,
        status
      })
      .returning('*');

    return res.status(201).json('Cadastro criado com Sucesso');
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

const editarCobranca = async (req, res) => {
  let { descricao, valor, vencimento, status } = req.body;
  const id = req.clienteId;

  try {
    await editarCobrancaSchema.validate(req.body);
    const cobranca = await knex('cobrancas').where({ id }).first();

    if (!cobranca) {
      return res.status(404).json('Cobrança Não encontrada');
    }
    const atualizarCobranca = await knes('cobrancas')
      .where({ id })
      .update({ descricao, valor, vencimento, status });
    if (!atualizarCobranca) {
      return res.status(400).json('A cobranção não foi atualizada!');
    }
    return res.status(200).json('Cobrança Atualizada com Sucesso!');
  } catch (error) {
    return res.status(400).json(error.message);
  }
};
module.exports = {
  cadastrarCobranca
};
