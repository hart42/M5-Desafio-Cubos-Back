const knex = require('../bancoDeDados/conexao');
const bcrypt= require('bcrypt');
const jwt = require('jsonwebtoken');
const loginSchema = require('../validacoes/loginSchema');

const login = async (req, res) => {
  const { email, senha } = req.body;

  try {
    await loginSchema.validate(req.body);

    const usuario = await knex('usuarios').where({ email }).first();

    if (!usuario) {
      return res.status(404).json('Usuario não encontrado!');
    }

    const validarSenha = await bcrypt.compare(senha, usuario.senha);
    
    if (!validarSenha) {
      return res.status(400).json('Senha ou Email incorretos');
    }

    const token = jwt.sign({ id: usuario.id }, process.env.SENHA_JWT, { expiresIn: '999999h' });

    return res.status(200).json({ token: token });

  } catch (error) {
    return res.status(400).json(error.message);
  }
};

module.exports = {
  login
}