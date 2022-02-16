const knex = require('../bancoDeDados/conexao');
const cadastroClienteSchema = require('../validacoes/cadastroClienteSchema');

const cadastrarCliente = async (req, res) => {
  const {
    nome,
    email,
    cpf,
    telefone,
    cep,
    logradouro,
    complemento,
    bairro,
    cidade,
    estado
  } = req.body;

  try {
    await cadastroClienteSchema.validate(req.body);

    const verificarEmail = await knex('clientes').where({ email }).first();

    if (verificarEmail) {
      return res.status(401).json("Email ja cadastrado");
    }

    const verificarCpf = await knex('clientes')
      .where({ cpf })
      .first();

    if (verificarCpf) {
      return res.status(401).json("Cpf ja registrado em outro cliente");
    }

    const cliente = await knex('clientes')
      .insert({
        nome,
        email,
        cpf,
        telefone,
        cep,
        logradouro,
        complemento,
        bairro,
        cidade,
        estado
      })
      .returning('*');

    if (!cliente) {
      return res.status(400).json("O cliente não foi cadastrado.");
    }

    return res.status(201).json("Cliente cadastrado com sucesso");

  } catch (error) {
    return res.status(400).json(error.message);
  }
};
const listarClientes = async (req, res) => {
  try {
    const clientes = await knex('clientes').select('id', 'nome', 'cpf', 'email', 'telefone');

    if (clientes[0] === undefined) {
      return res.status(400).json("Não foi encontrado nenhum cliente");
    }

    return res.status(200).json(clientes);

  } catch (error) {
    return res.status(400).json(error.message);
  }

};
const listaCliente = async (req, res) => {
  const id = req.params.id;

  try {
    const cliente = await knex('clientes').where({ id }).select('*').first();

    if (cliente === undefined) {
      return res.status(404).json("O cliente procurado nao existe");
    }

    return res.status(200).json(cliente);
  } catch (error) {
    console.log(error);
  }
};
const editarCliente = async (req, res) => {
  const id = req.params.id;
  const {
    nome,
    email,
    cpf,
    telefone,
    cep,
    logradouro,
    complemento,
    bairro,
    cidade,
    estado
  } = req.body;

  try {
    await cadastroClienteSchema.validate(req.body);

    const verificaId = await knex('clientes').where({ id }).first();

    if (!verificaId) {
      return res.status(404).json("O cliente procurado não foi encontrado!")
    }

    const verificarEmail = await knex('clientes').where({ email }).where(id , '!=', id).first();

    if (verificarEmail) {
      return res.status(401).json("Email ja cadastrado");
    }

    const verificarCpf = await knex('clientes')
      .where({ cpf }).where(id, '!=', id)
      .first();

    if (verificarCpf) {
      return res.status(401).json("Cpf ja registrado em outro cliente");
    }

    const cliente = await knex('clientes')
      .update({
        nome,
        email,
        cpf,
        telefone,
        cep,
        logradouro,
        complemento,
        bairro,
        cidade,
        estado
      }).where({ id })
      .returning('*');

    if (!cliente) {
      return res.status(400).json("O cliente não foi editado.");
    }

    return res.status(201).json("Cliente editado com sucesso");

  } catch (error) {
    console.log(error);
  }
};
const deletarCliente = async (req, res) => {
  const { id } = req.params;

  try {
    const verificarCliente = await knex('clientes').where({ id });

    if (!verificarCliente) {
      return res.status(404).json("Cliente não encontrado");
    }

    const excluirCliente = await knex('clientes').where({ id }).del().returning('*');

    if (!excluirCliente) {
      return res.status(400).json("Cliente não foi deletado");
    }

    return res.status(200).json("cliente excluido com sucesso!");

  } catch (error) {
    return res.status(400).json(error.message);
  }
};


module.exports = {
  cadastrarCliente,
  listarClientes,
  listaCliente,
  deletarCliente,
  editarCliente,
}
