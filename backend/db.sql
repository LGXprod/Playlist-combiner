create table user (
	username varchar(50) not null,
    password varchar(50),
    fName varchar(30),
    sName varchar(30)
);

alter table user add constraint pk_user primary key (username);
alter table user add spotify_info longtext;