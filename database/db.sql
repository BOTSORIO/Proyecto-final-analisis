CREATE DATABASE test_analisis;

use test_analisis;

--USERS TABLE
CREATE TABLE usuario(
    id int not null PRIMARY KEY auto_increment,
    fullname varchar(100) not null,
    document varchar(200) not null
);

CREATE TABLE respuestas_test(
    id int not null PRIMARY KEY auto_increment,
    pregunta1 boolean,
    pregunta2 boolean,
    pregunta3 boolean,
    pregunta4 boolean,
    pregunta5 boolean,
    id_usuario int not null,
    constraint fk_user foreign key (id_usuario) references usuario(id)
);

CREATE TABLE encuesta(
    id int not null PRIMARY KEY auto_increment,
    pregunta1 int not null,
    pregunta2 int not null,
    pregunta3 int not null,
    id_usuario int not null,
    constraint fk_user foreign key (id_usuario) references usuario(id) 
);

