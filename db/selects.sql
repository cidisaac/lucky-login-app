SELECT *
FROM country;

SELECT *
FROM city;

SELECT *
FROM address;

SELECT *
FROM profile;

SELECT *
FROM users;

SELECT profile.id,
       users.username,
       address.street,
       city.name,
       country.name
FROM profile
         INNER JOIN users on users.id = profile.userId
         INNER JOIN address on address.id = profile.addressId
         INNER JOIN city on city.id = address.cityId
         INNER JOIN country on country.id = city.countryId

where profile.userid = 1

;