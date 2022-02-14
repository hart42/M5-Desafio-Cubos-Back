const express = require('express');
const rotas = express();

const usuarios = require('./controladores/usuarios');
const login = require('./controladores/login');
const filtroLogin = require('./filtro/filtroLogin');
const clientes = require('./controladores/clientes');

rotas.post('/usuarios', usuarios.cadastrarUsuario);

rotas.post('/login', login.login);

rotas.use(filtroLogin);

rotas.get('/perfil', usuarios.obterPerfilUsuario);
rotas.put('/perfil', usuarios.editarPerfilUsuario);

rotas.post('/clientes', clientes.cadastrarCliente);
rotas.get('/clientes', clientes.listarClientes);
rotas.get('/clientes/:id', clientes.listaCliente);
rotas.put('/clientes/:id', clientes.editarCliente);
rotas.delete('/clientes/:id', clientes.deletarCliente);


module.exports = rotas;