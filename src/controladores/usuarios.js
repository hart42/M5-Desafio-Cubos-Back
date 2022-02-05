const knex = require('../bancoDeDados/conexao');
const bcrypt = require('bcrypt');
const cadastroUsuarioSchema = require('../validacoes/cadastroUsuarioSchema');

const cadastrarUsuario = async (req, res) => {
  const { nome, email, senha } = req.body;

  try {
    await cadastroUsuarioSchema.validate(req.body);

    const existeUsuario = await knex('usuarios')
      .where({ email })
      .first();

    if (existeUsuario) {
      return res.status(400).json("O email já esta cadastrado!");
    }

    const senhaCriptografada = await bcrypt.hash(senha, 10);

    const usuario = await knex('usuarios')
      .insert({
        nome,
        email,
        senha: senhaCriptografada,
      })
      .returning('*');

    if (!usuario) {
      return res.status(400).json("O usuário não foi cadastrado.");
    }

    return res.status(200).json(usuario[0]);

  } catch (error) {
    return res.status(400).json(error.message); 
  }
};

const perfilUsuario = async (req, res) => {
  const id = req.usuarioId;

  try {
    const usuario = await knex('usuarios').where({ id }).first();

    if (!usuario) {
      return res.status(404).json('Usuario não encontrado');
    }

    const { senha: _, ...dadosUsuario } = usuario;

    return res.status(200).json(dadosUsuario);
    
  } catch (error) {
    return res.status(400).json(error.message); 
  }
};

module.exports = {
  cadastrarUsuario,
  perfilUsuario,
};