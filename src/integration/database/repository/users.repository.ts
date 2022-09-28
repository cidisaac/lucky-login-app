import UsersRepositoryInterface from "../interfaces/users-repository.interface";
import User from "../models/user.model";
import {Inject, Injectable} from "@nestjs/common";
import {NEST_PGPROMISE_CONNECTION} from "nestjs-pgpromise";
import {IDatabase} from "pg-promise";
import CreateUserDto from "../../../api/dtos/create-user.dto";
import {CustomLogger} from "../../../config/logger/custom-logger.service";
import Profile from "../models/profile.model";
import ProfileDao from "../dao/profile.dao";
import {
    createAddress,
    createProfile,
    createUser,
    getAllUsers,
    getProfile,
    getUserByUsername
} from "../../../constants/queries/queries";
import CreateUserException from "../../exceptions/create-user.exception";
import UserNotFoundException from "../../exceptions/user-not-found.exception";
import ProfileNotFoundException from "../../exceptions/profile-not-found.exception";
import Address from "../models/address.model";

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
        const address = Address.fromCreateUserDto(createUserDto);
        const profile = Profile.fromCreateUserDto(createUserDto);
        return await this.pg.tx(this.usersTx(user, address, profile))
            .then((data) => {
                this.logger.info('Usuario creado correctamente con profile: ', data)
            })
            .catch((err) => {
                this.logger.error('Usuario no creado: ', err);
                throw new CreateUserException(
                    err.message,
                    'Error creating user'
                )
            });
    }

    async getByUsername(username: string): Promise<User> {

        try {
            return await this.pg.one(getUserByUsername, [username]);
        } catch (err) {
            this.logger.error('Usuario no encontrado', {username: username});
            this.logger.debug('Usuario no encontrado', err);
            throw new UserNotFoundException(
                err.message,
                'User not found exception'
            );
        }
    }

    async getProfileByUserId(id: number): Promise<ProfileDao> {

        try {
            const profile = await this.pg.one(getProfile, [id]);

            return profile as ProfileDao;
        } catch (err) {
            throw new ProfileNotFoundException(
                err.message,
                'Profile not found exception'
            );
        }

    }

    private usersTx(user: User, address: Address, profile: Profile) {
        return async t1 => {
            const userId = await t1
                .one(createUser,
                    user,
                    a => a.id
                );
            return await t1.tx(this.addressTx(address, profile, userId))
        };
    }

    private addressTx(address: Address, profile: Profile, userId: any) {
        return async t2 => {
            const addressId = await t2
                .one(createAddress,
                    address,
                    a => a.id
                );
            return await t2.tx(this.profileTx(profile, userId, addressId))
        };
    }

    private profileTx(profile: Profile, userId: number, addressId: number) {
        return async t3 => {
            profile.userId = userId;
            profile.addressId = addressId;
            const profileId = await t3
                .one(createProfile,
                    profile,
                    a => a.id
                );
            return {userId, profileId, addressId};
        };
    }

}