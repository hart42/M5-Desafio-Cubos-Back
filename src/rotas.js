const express = require('express');
const rotas = express();

const usuarios = require('./controladores/usuarios');
const login = require('./controladores/login');

rotas.post('/usuarios', usuarios.cadastrarUsuario);

rotas.post('/login', login.login);

module.exports = rotas;