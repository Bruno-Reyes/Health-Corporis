/* Creando base de datos */
CREATE DATABASE HC;
USE HC;

CREATE TABLE Genero(
    id_gen tinyint not null auto_increment,
    nom_gen varchar(10),
    primary key(id_gen)
);


CREATE TABLE Enfermedades(
    id_enf tinyint not null auto_increment,
    tip_enf varchar(30) not null,
    primary key(id_enf)
);

CREATE TABLE FrecuenciaEjercicio(
    id_fre int not null auto_increment,
    fre_eje varchar(30) not null,
    primary key(id_fre)
);

CREATE TABLE Medicion(
    id_med TINYINT not null auto_increment,
    tip_med varchar(20) not null,
    primary key(id_med)
);

CREATE TABLE Intensidad(
    id_int tinyint not null auto_increment,
    intensidad varchar(10) not null,
    primary key(id_int)
);

CREATE TABLE Persona(
    id_per int not null auto_increment,
    nombre varchar(20) not null,
    apellido varchar(20) not null,
    fec_nac DATE not null,
    fre_rep varchar(5),
    fre_opt varchar(5),
    id_gen tinyint not null,
    id_fre int not null,
    id_enf tinyint not null,
    primary key(id_per),
    CONSTRAINT FOREIGN KEY(id_gen) REFERENCES Genero(id_gen),
    CONSTRAINT FOREIGN KEY(id_fre) REFERENCES FrecuenciaEjercicio(id_fre),
    CONSTRAINT FOREIGN KEY(id_enf) REFERENCES Enfermedades(id_enf)
);

CREATE TABLE Seguimiento(
    id_seg int not null auto_increment,
    peso varchar(6) not null,
    est_seg varchar(3) not null,
    imc_seg varchar(6) not null,
    fec_reg DATE not null,
    id_per int not null,
    primary key(id_seg),
    CONSTRAINT FOREIGN KEY(id_per) REFERENCES Persona(id_per)
);

CREATE TABLE Usuario(
    id_usu int not null auto_increment,
    nom_usu varchar(25) not null,
    email_usu varchar(50) not null,
    psw_usu varchar(250) not null,
    id_per int not null,
    id_int tinyint,
    PRIMARY KEY(id_usu),
    CONSTRAINT FOREIGN KEY(id_per) REFERENCES Persona(id_per),
    CONSTRAINT FOREIGN KEY(id_int) REFERENCES Intensidad(id_int)
);

CREATE TABLE Ejercicio(
    id_eje int not null auto_increment,
    nom_eje varchar(25) not null,
    img_eje varchar(100) not null,
    des_eje varchar(1000) not null,
    series tinyint not null,
    cantidad tinyint not null,
    id_int tinyint not null,
    id_med TINYINT not null,
    PRIMARY KEY(id_eje),
    CONSTRAINT FOREIGN KEY(id_int) REFERENCES Intensidad(id_int),
    CONSTRAINT FOREIGN KEY(id_med) REFERENCES Medicion(id_med)
);

insert into FrecuenciaEjercicio (fre_eje) values('Nunca'),('Raramente'),('Ocasionalmente'),('Generalmente'),('Siempre');