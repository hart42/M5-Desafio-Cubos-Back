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
}

module.exports = {
  cadastrarCliente,
  listarClientes,
}
