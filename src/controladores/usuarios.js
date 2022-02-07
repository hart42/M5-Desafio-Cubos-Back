const knex = require('../bancoDeDados/conexao');
const bcrypt = require('bcrypt');
const cadastroUsuarioSchema = require('../validacoes/cadastroUsuarioSchema');
const editarUsuarioSchema = require('../validacoes/editarUsuarioSchema');

const cadastrarUsuario = async (req, res) => {
  const { nome, email, senha } = req.body;

  try {
    await cadastroUsuarioSchema.validate(req.body);

    const existeUsuario = await knex('usuarios')
      .where({ email })
      .first();

    if (existeUsuario) {
      return res.status(401).json("O email já esta cadastrado!");
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

    return res.status(201).json("Usuario cadastrado com sucesso");

  } catch (error) {
    return res.status(400).json(error.message); 
  }
};

const obterPerfilUsuario = async (req, res) => {
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

const editarPerfilUsuario = async (req, res) => {
  let { nome, email, senha, cpf, telefone } = req.body;
  const id = req.usuarioId;

  try {
    await editarUsuarioSchema.validate(req.body);
    
    const usuario = await knex('usuarios').where({ id }).first();
    
    if(!usuario) {
      return res.status(404).json('Usuario não encontrado!');
    }

    if (senha) {
      senha = await bcrypt.hash(senha, 10);
    }

    if (email !== usuario.email) {
      const verificarEmail = await knex('usuarios')
        .where({ email })
        .first();

      if (verificarEmail) {
        return res.status(401).json("Email ja cadastrado");
      }
    }

    if ( cpf && cpf !== usuario.cpf) {
      const verificarCpf = await knex('usuarios')
        .where({ cpf })
        .first();

      if (verificarCpf) {
        return res.status(401).json("Cpf ja cadastrado em outra conta");
      }
    }

    const atualizarUsuario = await knex('usuarios')
      .where({ id })
      .update({ 
        nome,
        email,
        senha, 
        cpf, 
        telefone 
      });
    
    if (!atualizarUsuario) {
      return res.status(400).json('O usuario não foi atualizado');
    }

    return res.status(200).json('Usuario foi atualizado com sucesso.');

  } catch (error) {
    return res.status(400).json(error.message);
  }
}

module.exports = {
  cadastrarUsuario,
  obterPerfilUsuario,
  editarPerfilUsuario,
};