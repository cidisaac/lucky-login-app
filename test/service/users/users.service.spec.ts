import UsersRepository from "../../../src/integration/database/repository/users.repository";
import usersRepositoryMock from "../../mocks/integration/database/repository/users.repository.mock";
import * as sinon from 'sinon';
import {UsersService} from "../../../src/service/users/users.service";
import {CustomLogger} from "../../../src/config/logger/custom-logger.service";
import customLoggerMock from "../../mocks/config/logger/custom-logger-service.mock";
import RedisClient from "../../../src/integration/cache/redis/redis.client";
import redisClientMock from "../../mocks/integration/cache/redis/redis.client.mock";
import CreateUserDto from "../../../src/api/dtos/create-user.dto";
import {BadRequestException} from "@nestjs/common";
import assert from 'assert';
import RegisterException from "../../../src/service/exceptions/register.exception";
import User from "../../../src/integration/database/models/user.model";
import UserNotFoundException from "../../../src/integration/exceptions/user-not-found.exception";
import ProfileNotFoundException from "../../../src/integration/exceptions/profile-not-found.exception";

describe('UsersService', () => {

    const USER_ID = 1;
    const USERNAME = 'anUsername';
    const PASSWORD = 'aPass';
    const NAME = 'aName';
    const CITY_ID = 1;
    const ADDRESS = 'Siempre Viva 123';
    const STREET = 'aStreet';
    const CITY = 'aCity';
    const COUNTRY = 'aCountry'

    let usersRepository: UsersRepository;
    let usersService: UsersService;
    let logger: CustomLogger;
    let cacheClient: RedisClient;
    let createUserDto: CreateUserDto;
    let user: User;
    beforeEach(async () => {

        logger = await customLoggerMock({
            error: sinon.stub(),
            setContext: sinon.stub()
        });

        cacheClient = await redisClientMock({
            get: sinon.stub().returns('1'),
            set: sinon.stub().returns(Promise.resolve())
        });

        usersRepository = await usersRepositoryMock({
            create: sinon.stub().returns(),
            getByUsername: sinon.stub().returns(new User(USERNAME, PASSWORD)),
            getProfileByUserId: sinon.stub().returns({
                id: USER_ID,
                name: NAME,
                street: STREET,
                city: CITY,
                country: COUNTRY,
            })
        });

        createUserDto = new CreateUserDto();
        createUserDto.name = NAME;
        createUserDto.username = USERNAME;
        createUserDto.password = PASSWORD;
        createUserDto.cityId = CITY_ID;
        createUserDto.address = ADDRESS;

    })

    describe('register', () => {
        it('should not throw an error when register is OK', async () => {
            usersService = new UsersService(usersRepository, logger);

            expect(async () => {
                await usersService.register(createUserDto)
            }).not.toThrow();
        });

        it('should return RegisterException when usersRepository throws an error', async () => {
            usersRepository = await usersRepositoryMock({
                create: sinon.stub().throws(new BadRequestException())
            });

            usersService = new UsersService(usersRepository, logger);

            try {
                await usersService.register(createUserDto);
                assert(fail);
            } catch (err) {
                expect(err).toBeDefined();
                expect(err).toBeInstanceOf(RegisterException);
            }
        });
    });

    describe('findOne', () => {
        it('should return a User', async () => {
            usersService = new UsersService(usersRepository, logger);

            const result = await usersService.findOne(USERNAME);

            expect(result).toHaveProperty('username', USERNAME)
            expect(result).toHaveProperty('password', PASSWORD)

        });

        it('should returns a UserNotFoundException when usersRepository throws an exception', async () => {
            usersRepository = await usersRepositoryMock({
                getByUsername: sinon.stub()
                    .throws(new UserNotFoundException(
                            'User not found',
                            'User not found exception'
                        )
                    )
            })

            usersService = new UsersService(usersRepository, logger);

            try {
                await usersService.findOne(USERNAME);
                assert(fail);
            } catch (err) {
                expect(err).toBeDefined();
                expect(err).toBeInstanceOf(UserNotFoundException);
            }
        });


    });

    describe('getProfileById', () => {
        it('should return a ProfileDao', async () => {
            usersService = new UsersService(usersRepository, logger);

            const result = await usersService.getProfileById(USER_ID);

            expect(result).toBeDefined();
            expect(result).toHaveProperty('id', USER_ID);
            expect(result).toHaveProperty('name', NAME);
            expect(result).toHaveProperty('street', STREET);
            expect(result).toHaveProperty('city', CITY);
            expect(result).toHaveProperty('country', COUNTRY);
        });

        it('should return a ProfileNotFoundException when usersRepository throws an error', async () => {
            usersRepository = await usersRepositoryMock({
                getProfileByUserId: sinon.stub()
                    .throws(new ProfileNotFoundException(
                            'Profile not found',
                            'Profile not found exception'
                        )
                    )
            });

            usersService = new UsersService(usersRepository, logger);

            try {
                await usersService.getProfileById(USER_ID);
                assert(fail);
            } catch (err) {
                expect(err).toBeDefined();
                expect(err).toBeInstanceOf(ProfileNotFoundException);
            }
        });
    });
})