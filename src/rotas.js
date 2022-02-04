const express = require('express');
const rotas = express();

const usuarios = require('./controladores/usuarios');

rotas.post('/usuarios', usuarios.cadastrarUsuario);

module.exports = rotas;