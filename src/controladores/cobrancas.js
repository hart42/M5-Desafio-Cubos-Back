const knex = require('../bancoDeDados/conexao');
const cadstroCobrancasSchema = require('../validacoes/cadastroCobrancaSchema');
const editarCobrancaSchema = require('../validacoes/editarCobrancaSchema');

const listarCobrancas = async (req, res) => {
  try {
    const cobrancas = await knex('cobrancas').select('*');

    if (cobrancas[0] === undefined) {
      return res.status(404).json("Não foi encontrada nenhuma cobrança!");
    }

    return res.status(200).json(cobrancas);

  } catch (error) {
    return res.status(400).json(error.message);
  }
};
const listaCobranca = async (req, res) => {
  const { id } = req.params;

  try {
    const cobranca = await knex('cobrancas').where({ id }).select('*').first();

    if (cobranca === undefined) {
      return res.status(404).json("A cobrança procurada não foi encontrada!");
    }

    return res.status(200).json(cobranca);

  } catch (error) {
    return res.status(400).json(error.message);
  }
};
const cadastrarCobranca = async (req, res) => {
  const { cliente_id, cliente_nome, descricao, valor, vencimento, cobranca_status } = req.body;

  try {
    await cadstroCobrancasSchema.validate(req.body);

    const cobranca = await knex('cobrancas')
      .insert({
        cliente_id,
        cliente_nome,
        descricao,
        valor,
        vencimento,
        cobranca_status
      })
      .returning('*');

    if (!cobranca) {
      return res.status(400).json("A cobrança não pôde ser cadastrada!");
    }

    return res.status(201).json('Cadastro criado com Sucesso');
  } catch (error) {
    return res.status(400).json(error.message);
  }
};
const editarCobranca = async (req, res) => {
  let { descricao, valor, vencimento, cobranca_status } = req.body;
  const { id } = req.params;

  try {
    await editarCobrancaSchema.validate(req.body);

    const cobranca = await knex('cobrancas').where({ id }).first();

    if (!cobranca) {
      return res.status(404).json('Cobrança Não encontrada');
    }

    const atualizarCobranca = await knex('cobrancas')
      .where({ id })
      .update({
        descricao,
        valor,
        vencimento,
        cobranca_status
      });

    if (!atualizarCobranca) {
      return res.status(400).json('A cobranção não foi atualizada!');
    }

    return res.status(200).json('Cobrança Atualizada com Sucesso!');
  } catch (error) {
    return res.status(400).json(error.message);
  }
};
const excluirCobranca = async (req, res) => {
  const { id } = req.params;

  try {
    const verificaCobranca = await knex('cobrancas').where({ id });

    if (!verificaCobranca) {
      return res.status(404).json("Cobrança não encontrada!");
    }

    const excluirCobranca = await knex('cobrancas').where({ id }).del().returning('*');

    if (!excluirCobranca) {
      return res.status(400).json("A cobrança não pôde ser deletada!");
    }

    return res.status(200).json("Cobrança excluída com sucesso!");

  } catch (error) {
    return res.status(400).json(error.message);
  }
};

module.exports = {
  listarCobrancas,
  listaCobranca,
  cadastrarCobranca,
  editarCobranca,
  excluirCobranca,
};
