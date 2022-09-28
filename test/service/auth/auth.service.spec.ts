import {UsersService} from "../../../src/service/users/users.service";
import {JwtService} from "@nestjs/jwt";
import usersServiceMock from "../../mocks/service/users.service.mock";
import * as sinon from 'sinon';
import User from "../../../src/integration/database/models/user.model";
import AuthService from "../../../src/service/auth/auth.service";
import jwtServiceMock from "../../mocks/service/jwt.service.mock";
import {hash} from '../../../src/utils/hash';

describe('AuthService', () => {
    const USERNAME = 'anUsername';
    const PASSWORD = 'aPass';
    const OTHER_PASSWORD = 'aPass';
    const TOKEN = 'aToken'

    let usersService: UsersService;
    let jwtService: JwtService;
    let authService: AuthService;

    beforeEach(async () => {

        let hashedPass = await hash(PASSWORD);

        usersService = await usersServiceMock({
            findOne: sinon.stub().returns(new User(USERNAME, hashedPass))
        });

        jwtService = await jwtServiceMock({
            sign: sinon.stub().returns(TOKEN)
        });

    })

    describe('validateUser', () => {
        it('should return an username', async () => {

            authService = new AuthService(usersService, jwtService);

            const result = await authService.validateUser(USERNAME, PASSWORD);

            expect(result).toBeDefined();
            expect(result).toHaveProperty('username', USERNAME);
        });

        it('should return null when password matching is false', async () => {
            usersService = await usersServiceMock({
                findOne: sinon.stub().returns(new User(USERNAME, OTHER_PASSWORD))
            });
            authService = new AuthService(usersService, jwtService);

            const result = await authService.validateUser(USERNAME, OTHER_PASSWORD);

            expect(result).toBeNull();
        });

        it('should return null when user not found', async () => {
            usersService = await usersServiceMock({
                findOne: sinon.stub().returns(null)
            });
            authService = new AuthService(usersService, jwtService);

            const result = await authService.validateUser(USERNAME, PASSWORD);

            expect(result).toBeNull();
        });
    });

    describe('login', () => {
        it('should return an access_token', async () => {

            authService = new AuthService(usersService, jwtService);

            const result = await authService.login({username: USERNAME, password: PASSWORD})

            expect(result).toBeDefined();
            expect(result).toHaveProperty('access_token', TOKEN);

        });
    });
})