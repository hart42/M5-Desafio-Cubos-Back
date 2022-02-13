const express = require('express');
const rotas = express();

const usuarios = require('./controladores/usuarios');
const login = require('./controladores/login');
const filtroLogin = require('./filtro/filtroLogin');
const clientes = require('./controladores/clientes');
const cobrancas = require('./controladores/cobrancas');

rotas.post('/usuarios', usuarios.cadastrarUsuario);

rotas.post('/login', login.login);

rotas.use(filtroLogin);

rotas.get('/perfil', usuarios.obterPerfilUsuario);
rotas.put('/perfil', usuarios.editarPerfilUsuario);

rotas.post('/clientes', clientes.cadastrarCliente);
rotas.get('/clientes', clientes.listarClientes);

rotas.post('/cobrancas', cobrancas.cadastrarCobranca);

module.exports = rotas;
