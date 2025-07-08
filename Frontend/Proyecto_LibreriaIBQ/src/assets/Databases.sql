create database libreria_IBQ;

use libreria_IBQ;

create table users (
	id_account int(11) primary key auto_increment,
	username varchar(50),
    passw varchar(500) not null,
    first_name varchar(50) not null,
    last_name varchar(50) not null,
    id int(11) not null,
    is_admin bool
);

create table categories (
	id_category int(11) primary key auto_increment,
    user_id int(11) not null,
    username varchar(50) not null,
    category_name varchar(50) not null,
	created_at timestamp default current_timestamp 
);

create table documents (
	id_document int(11) primary key auto_increment,
    user_id int(11) not null,
    username varchar(50) not null,
    file_category varchar(50) NULL,
    id_category int(11) NULL,
    file_name varchar(255) not null,
    file_path varchar(255) not null,
    file_type varchar(50) not null,
    uploaded_at timestamp default current_timestamp
);


-- drop database libreria_ibq;