export const getProfile = 'SELECT profile.id, profile.name, address.street,' +
    'city.name as city, country.name as country ' +
    'FROM profile ' +
    'INNER JOIN users on users.id = profile.userId ' +
    'INNER JOIN address on address.id = profile.addressId ' +
    'INNER JOIN city on city.id = address.cityId ' +
    'INNER JOIN country on country.id = city.countryId ' +
    'WHERE profile.userid = $1';

export const getUserByUsername = 'SELECT id, username, password FROM users WHERE username=$1';

export const createUser = 'INSERT INTO users(username, password) ' +
    'VALUES (${username}, ${password}) RETURNING id,username,password';

export const createProfile = 'INSERT INTO profile(userId, addressId, name)' +
    ' VALUES (${userId}, ${addressId}, ${name}) RETURNING id';

export const createAddress = 'INSERT INTO address(cityId, street) ' +
    'VALUES (${cityId}, ${street}) RETURNING id'

export const getAllUsers = 'SELECT id, username, password FROM users';