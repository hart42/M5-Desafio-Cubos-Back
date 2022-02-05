const express = require('express');
const rotas = express();

const usuarios = require('./controladores/usuarios');
const login = require('./controladores/login');
const filtroLogin = require('./filtro/filtroLogin');

rotas.post('/usuarios', usuarios.cadastrarUsuario);

rotas.post('/login', login.login);

rotas.use(filtroLogin);

rotas.get('/perfil', usuarios.perfilUsuario);

module.exports = rotas;