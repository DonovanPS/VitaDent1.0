Create database VitaDent_db;

use VitaDent_db;

Create table Users(
    id INT(11) NOT NULL AUTO_INCREMENT,
    user varchar(180) NOT NULL,
    password varchar(180) NOT NULL,
    PRIMARY KEY(id, User)
);

DESCRIBE User;