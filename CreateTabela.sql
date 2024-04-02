create database atv1;
use atv1;

create table Produtos (
	id int primary key auto_increment,
	nome varchar(100),
	empresa varchar(100),
    descricao varchar(100),
    quantidade integer,
    marca varchar(100),
	valor float,
	createdAt DATETIME, 
	updatedAt DATETIME
);


select * from Produtos;