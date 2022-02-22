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

rotas.get('/clientes/home', clientes.clientesDaHome);

rotas.post('/clientes', clientes.cadastrarCliente);
rotas.get('/clientes', clientes.listarClientes);
rotas.get('/clientes/:id', clientes.listaCliente);
rotas.put('/clientes/:id', clientes.editarCliente);
rotas.delete('/clientes/:id', clientes.deletarCliente);

rotas.get('/cobrancas', cobrancas.listarCobrancas);
rotas.get('/cobrancas/:id', cobrancas.listaCobranca);
rotas.post('/cobrancas', cobrancas.cadastrarCobranca);
rotas.put('/cobrancas/:id', cobrancas.editarCobranca);
rotas.delete('/cobrancas/:id', cobrancas.excluirCobranca);

module.exports = rotas;
