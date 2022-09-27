import UsersRepositoryInterface from "../interfaces/users-repository.interface";
import User from "../models/user.model";
import {BadRequestException, HttpStatus, Inject, Injectable, NotFoundException} from "@nestjs/common";
import {NEST_PGPROMISE_CONNECTION} from "nestjs-pgpromise";
import {IDatabase} from "pg-promise";
import CreateUserDto from "../../../api/dtos/create-user.dto";
import {CustomLogger} from "../../../config/logger/custom-logger.service";
import Profile from "../models/profile.model";
import ProfileDao from "../dao/ProfileDao";
import {
    createProfile,
    createUser,
    getAllUsers,
    getProfile,
    getUserByUsername
} from "../../../constants/queries/queries";
import CreateUserException from "../../exceptions/CreateUserException";

@Injectable()
export default class UsersRepository implements UsersRepositoryInterface {

    constructor(
        @Inject(NEST_PGPROMISE_CONNECTION) private readonly pg: IDatabase<any>,
        private readonly logger: CustomLogger
    ) {
        this.logger.setContext(UsersRepository.name);
    }

    async getAll(): Promise<User[]> {
        return await this.pg.any(getAllUsers);
    }

    async create(createUserDto: CreateUserDto): Promise<void> {

        const user = User.fromCreateUserDto(createUserDto);
        const profile = Profile.fromCreateUserDto(createUserDto);
        await this.pg.tx(async t1 => {
            const userId = await t1
                .one(createUser,
                    user,
                    a => a.id
                );
            return await t1.tx(async t2 => {
                profile.userId = userId;
                const profileId = await t2
                    .one(createProfile,
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
                throw new CreateUserException(
                    err.message,
                    HttpStatus.BAD_REQUEST,
                    'CREATE_USER_ERROR',
                    'Error creating user'
                )
            });
    }

    async getByUsername(username: string): Promise<User> {

        try {
            const user = await this.pg.oneOrNone(getUserByUsername, [username]);

            if (!user) {
                throw new NotFoundException();
            }
            return user;
        } catch (err) {
            throw new BadRequestException();
        }
    }

    async getProfileByUserId(id: number): Promise<ProfileDao> {

        try {
            const profile = await this.pg
                .oneOrNone(getProfile, [id]);

            if (!profile) {
                throw new NotFoundException();
            }

            return profile as ProfileDao;
        } catch (err) {
            throw new BadRequestException();
        }

    }

}