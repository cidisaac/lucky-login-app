## Description

Login with Nodejs using
[Nest](https://github.com/nestjs/nest) framework with TypeScript.

## Installation

### Running in a container

In root folder run:

```bash
docker compose up
```

This command should start 3 containers:

* redis
* postgres
* nest app

### Running locally

```bash
$ npm install --legacy-peer-deps
```

Start redis and postgres containers with docker compose local:

```bash
docker compose -f docker-compose-local.yml up -d
```

Start the app:

```bash
npm run start:dev
```

### Database Schema examples:

address:

| id | cityId | street
| :---: | :---: | :---: |
| 1 | 1 | Siempre Viva 123 |

city:

| id | countryId | name
| :---: | :---: | :---: |
| 1 | 1 | Buenos Aires |

country:

| id | name | 
| :---: | :---: |
| 1 | Argentina |  

profile:

| id | userId | addressid | name
| :---: | :---: | :---: | :---: |
| 1 | 1 | 1 | aName |

users:

| id | username | password
| :---: | :---: | :---: |
| 1 | aUsername | lkj12b%^&..123 |

### Api Examples

#### SignIn user

```bash
curl --location --request POST 'http://localhost:3000/v1/api/register' \
--header 'Content-Type: application/json' \
--data-raw '{
    "username": "prueba",
    "password": "pruebaPass",
    "name": "Pruebas",
    "address": "Siempre Viva 123",
    "cityId": 1
}'
```

#### Login user

```bash
curl --location --request POST 'http://localhost:3000/v1/api/login' \
--header 'Content-Type: application/json' \
--data-raw '{
    "username":"prueba",
    "password":"pruebaPass"
}'
```

Returns:

```json
{
  "access_token": "{{access_token}}"
}
```

#### Get Profile

```bash
curl --location --request GET 'http://localhost:3000/v1/api/profile' \
--header 'Authorization: Bearer {{access_token}}'
```

Returns:

```json
{
  "id": 5,
  "name": "Pruebas",
  "address": {
    "street": "Grecia 2120",
    "city": "Santiago de Chile",
    "country": "Chile"
  }
}
```

## Test

```bash
# unit tests
$ npm run test
```
