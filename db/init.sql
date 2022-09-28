CREATE TABLE users
(
    id       SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password TEXT               NOT NULL
);

CREATE TABLE country
(
    id   SERIAL PRIMARY KEY,
    name VARCHAR(50)
);

CREATE TABLE city
(
    id        SERIAL PRIMARY KEY,
    countryId INT,
    name      VARCHAR(50),
    CONSTRAINT fk_country
        FOREIGN KEY (countryId)
            REFERENCES country (id)
);

CREATE TABLE address
(
    id     SERIAL PRIMARY KEY,
    cityId INT,
    street VARCHAR(50),
    CONSTRAINT fk_city
        FOREIGN KEY (cityId)
            REFERENCES city (id)

);

CREATE TABLE profile
(
    id        SERIAL PRIMARY KEY,
    userId    INT,
    addressId INT,
    name      VARCHAR(50),
    CONSTRAINT fk_user
        FOREIGN KEY (userId)
            REFERENCES users (id),
    CONSTRAINT fk_address
        FOREIGN KEY (addressId)
            REFERENCES address (id)
);


INSERT INTO country(name)
VALUES ('Argentina'),
       ('Chile'),
       ('Brasil');

INSERT INTO city(countryId, name)
VALUES (1, 'Buenos Aires'),
       (1, 'Cordoba'),
       (2, 'Santiago de Chile'),
       (2, 'Valparaiso'),
       (3, 'Rio de Janeiro');

-- INSERT INTO address(cityId, street)
-- VALUES (1, 'Las Heras 1650'),
--        (2, 'Av. Fernet 1234'),
--        (3, 'Grecia 2120'),
--        (4, 'Av. Valparaiso 42'),
--        (5, 'Av. Atlantica 220');

-- INSERT INTO users(username, password)
-- VALUES ('elisa', 'passwordElisa'),
--        ('majito', 'passwordMajito'),
--        ('dinho', 'passwordDinho');
--
-- INSERT INTO profile(userId, addressId, name)
-- VALUES (1, 1, 'Isaac Cid'),
--        (2, 4, 'Maria Jose'),
--        (3, 5, 'Ronaldinho Gaucho');

