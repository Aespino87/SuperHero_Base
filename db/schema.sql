DROP DATABASE if EXISTS superHeroes_db;
CREATE DATABASE superHeroes_db;
USE superheroes_db;

CREATE TABLE heroes (
    id INT(11) AUTO_INCREMENT NOT NULL,
    hero_name VARCHAR(100) NOT NULL,
    on_team BOOLEAN,

    PRIMARY KEY (id)

);

SELECT * FROM heroes;