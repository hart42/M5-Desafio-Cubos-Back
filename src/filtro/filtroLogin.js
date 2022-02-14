const knex = require('../bancoDeDados/conexao');
const jwt = require('jsonwebtoken');

const filtroLogin = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json('Não autorizado');
  };

  try {
    const token = authorization.split(" ")[1];
    const { id } = jwt.verify(token, process.env.SENHA_JWT);
    const validarUsuario = knex('usuarios').where({ id }).first();

    if(!validarUsuario) {
      return res.status(404).json('Usuario não encontrado');
    }

    req.usuarioId = id;

    next();
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

module.exports = filtroLogin;