import UsersRepositoryInterface from "../interfaces/UsersRepositoryInterface";
import User from "../models/User";
import {Inject, Injectable} from "@nestjs/common";
import {NEST_PGPROMISE_CONNECTION} from "nestjs-pgpromise";
import {IDatabase} from "pg-promise";
import CreateUserDto from "../../../api/dtos/CreateUserDto";
import {CustomLogger} from "../../../config/logger/custom-logger.service";
import Profile from "../models/Profile";

@Injectable()
export default class UsersRepository implements UsersRepositoryInterface {

    constructor(
        @Inject(NEST_PGPROMISE_CONNECTION) private readonly pg: IDatabase<any>,
        private readonly logger: CustomLogger
    ) {
        this.logger.setContext(UsersRepository.name);
    }

    async getAll(): Promise<User[]> {
        const users = await this.pg.any('SELECT * FROM \"user\"');

        return users;
    }

    async create(createUserDto: CreateUserDto): Promise<void> {

        const user = User.fromCreateUserDto(createUserDto);
        const profile = Profile.fromCreateUserDto(createUserDto);
        await this.pg.tx(async t1 => {
            const userId = await t1
                .one('INSERT INTO users(username, password) ' +
                    'VALUES (${username}, ${password}) RETURNING id',
                    user,
                    a => a.id
                );
            return await t1.tx(async t2 => {
                profile.userId = userId;
                const profileId = await t2
                    .one('INSERT INTO profile(userId, addressId, name)' +
                        ' VALUES (${userId}, ${addressId}, ${name}) RETURNING id',
                        profile,
                        a => a.id
                    );
                return {userId, profileId};
            })
        })
            .then((data) => {
                this.logger.log('Usuario creado correctamente con profile: ', data)
            })
            .catch((err) => {
                this.logger.error('Usuario no creado: ', err);
            })
    }

}