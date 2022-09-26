SELECT *
FROM country;

SELECT *
FROM city;

SELECT *
FROM address;

SELECT *
FROM profile;

SELECT *
FROM "user";

SELECT profile.id,
       u.username,
       u.password,
       a.street,
       c.name,
       c2.name
FROM profile
         INNER JOIN "user" u on u.id = profile.userId
         INNER JOIN address a on a.id = profile.addressId
         INNER JOIN city c on c.id = a.cityId
         INNER JOIN country c2 on c2.id = c.countryId;