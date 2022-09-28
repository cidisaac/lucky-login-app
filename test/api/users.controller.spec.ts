import {UsersController} from '../../src/api/controllers/users.controller';
import {UsersService} from '../../src/service/users/users.service';
import usersServiceMock from '../mocks/service/users.service.mock';
import * as sinon from 'sinon';
import CreateUserDto from '../../src/api/dtos/create-user.dto';
import AuthService from '../../src/service/auth/auth.service';
import authServiceMock from '../mocks/service/auth.service.mock';
import RegisterException from '../../src/service/exceptions/register.exception';
import assert from 'assert';

var httpMocks = require('node-mocks-http');

describe('UsersController', () => {
    let usersController: UsersController;
    let usersService: UsersService;
    let authService: AuthService;
    let createUseDto: CreateUserDto;
    let postRequestLogin;
    let getRequestProfile;
    beforeEach(async () => {
        usersService = await usersServiceMock({
            register: sinon.stub().returns()
        })

        authService = await authServiceMock({
            login: sinon.stub().returns({
                access_token: 'unToken'
            })
        })


        createUseDto = new CreateUserDto()
        createUseDto.username = 'isaaccid';
        createUseDto.password = 'pass1234';
        createUseDto.name = 'Isaac Cid';
        createUseDto.address = 'Siempre Viva 123';
        createUseDto.cityId = 1;

        postRequestLogin = httpMocks.createRequest({
            method: 'POST',
            url: 'v1/api/login',
            body: {
                username: 'prueba4',
                password: 'pruebaPass'
            }
        });

        getRequestProfile = httpMocks.createRequest({
            method: 'GET',
            url: 'v1/api/profile',
            headers: {
                'Authorization': 'Bearer unToken'
            }
        });

    });

    describe('register', () => {
        it('should not throw exception when is correct', () => {
            usersController = new UsersController(usersService, authService);
            expect(async () => {
                await usersController.register(createUseDto)
            }).not.toThrow();
        });

        it('should throw exception if UsersService throws an RegisterException', async () => {
            usersService = await usersServiceMock({
                register: sinon.stub()
                    .throws(new RegisterException('Register error', 'Register exception'))
            })
            usersController = new UsersController(usersService, authService);
            try {
                await usersController.register(createUseDto)
                assert(fail);
            } catch (err) {
                expect(err).toBeDefined();
                expect(err).toBeInstanceOf(RegisterException);
            }
        });
    });

    describe('login', () => {
        it('should returns a valid token', async () => {
            usersController = new UsersController(usersService, authService);
            const result = await usersController.login(postRequestLogin);

            expect(result).toBeDefined();
            expect(result).toHaveProperty('access_token');
        });
    });
});
