import {UsersController} from "../../src/api/controllers/users.controller";
import {UsersService} from "../../src/service/users/users.service";
import usersServiceMock from "../mocks/service/users.service.mock";
import * as sinon from 'sinon';
import CreateUserDto from "../../src/api/dtos/create-user.dto";
import AuthService from "../../src/service/auth/auth.service";
import authServiceMock from "../mocks/service/auth.service.mock";

describe('PingController', () => {
    let usersController: UsersController;
    let usersService: UsersService;
    let authService: AuthService;
    let createUseDto: CreateUserDto;

    beforeEach(async () => {
        usersService = await usersServiceMock({
            register: sinon.stub().returns()
        })

        authService = await authServiceMock({})


        createUseDto = new CreateUserDto()
        createUseDto.username = 'isaaccid';
        createUseDto.password = 'pass1234';
        createUseDto.name = 'Isaac Cid';
        createUseDto.addressId = 1;
        createUseDto.cityId = 1;

    });

    describe('register', () => {
        it('should not throw exception when is correct', () => {
            usersController = new UsersController(usersService, authService);
            expect(async () => {
                await usersController.register(createUseDto)
            }).not.toThrow();
        });

        it('should throw exception if UsersService throws an RegisterException', async () => {

        });
    });
});
