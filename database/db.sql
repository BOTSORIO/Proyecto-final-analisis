CREATE DATABASE test_analisis;

use test_analisis;

--USERS TABLE
CREATE TABLE usuario(
    id int not null PRIMARY KEY auto_increment,
    fullname varchar(100) not null,
    document varchar(200) not null,
    administrador boolean not null
);

CREATE TABLE respuestas_test(
    id int not null PRIMARY KEY auto_increment,
    pregunta1 int,
    pregunta2 int,
    pregunta3 int,
    pregunta4 int,
    pregunta5 int,
    nota float,
    id_usuario int not null,
    constraint fk_user foreign key (id_usuario) references usuario(id)
);

CREATE TABLE encuesta(
    id int not null PRIMARY KEY auto_increment,
    pregunta1 int not null,
    pregunta2 int not null,
    pregunta3 int not null,
    id_usuario int not null,
    constraint fk_user2 foreign key (id_usuario) references usuario(id) 
);
--Administradores de la app
insert into usuario values(1,"Braian", "1193421285",true);
insert into usuario values(2,"Sebastian", "1193409775",true);
insert into usuario values(3,"Melissa", "1010017812",true);

--Promedios de respuestas
select truncate(avg(pregunta1),2) from respuestas_test;
select truncate(avg(pregunta2),2) from respuestas_test;
select truncate(avg(pregunta3),2) from respuestas_test;
select truncate(avg(pregunta4),2) from respuestas_test;
select truncate(avg(pregunta5),2) from respuestas_test;

--Respuestas correctas
select count(pregunta1) from respuestas_test where pregunta1>0;
select count(pregunta2) from respuestas_test where pregunta2>0;
select count(pregunta3) from respuestas_test where pregunta3>0;
select count(pregunta4) from respuestas_test where pregunta4>0;
select count(pregunta5) from respuestas_test where pregunta5>0;

--Respuestas incorrectas
select count(pregunta1) from respuestas_test where pregunta1=0;
select count(pregunta2) from respuestas_test where pregunta2=0;
select count(pregunta3) from respuestas_test where pregunta3=0;
select count(pregunta4) from respuestas_test where pregunta4=0;
select count(pregunta5) from respuestas_test where pregunta5=0;

--Listado ordenado de mayor a menor 
select u.fullname, rt.nota from usuario u left join respuestas_test rt on u.id = rt.id_usuario order by rt.nota desc;

--Promedios de la encuesta de satisfaccion
select truncate(avg(pregunta1),2) from encuesta;
select truncate(avg(pregunta2),2) from encuesta;
select truncate(avg(pregunta3),2) from encuesta;
