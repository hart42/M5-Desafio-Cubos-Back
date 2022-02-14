drop table if exists clientes;

drop table if exists usuarios;

create table usuarios (
	id serial primary key,
  	nome text not null,
  	email text not null unique,
  	senha text not null,
  	cpf char(11) unique,
  	telefone text
);

create table clientes (
	id serial primary key,
  	nome text not null,
  	email text not null unique,
  	cpf char(11) not null unique,
  	telefone text not null,
  	cep integer,
  	logradouro text,
  	complemento text,
  	bairro text,
  	cidade text,
  	estado text
);
