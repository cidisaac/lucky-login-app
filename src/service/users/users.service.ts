import {Inject, Injectable} from '@nestjs/common';
import {CustomLogger} from "../../config/logger/custom-logger.service";
import CreateUserDto from "../../api/dtos/create-user.dto";
import {hash} from "../../utils/hash";
import RegisterException from "../exceptions/register.exception";
import User from "../../integration/database/models/user.model";
import ProfileDao from "../../integration/database/dao/profile.dao";
import UsersServiceInterface from "../interfaces/users-service.interface";
import UsersRepositoryInterface from "../../integration/database/interfaces/users-repository.interface";

@Injectable()
export class UsersService implements UsersServiceInterface {

    constructor(
        @Inject('UsersRepositoryInterface') private readonly usersRepository: UsersRepositoryInterface,
        private readonly logger: CustomLogger
    ) {
        this.logger.setContext(UsersService.name);
    }

    async register(createUserDto: CreateUserDto): Promise<void> {

        try {
            createUserDto.password = await hash(createUserDto.password);
            await this.usersRepository.create(createUserDto);

        } catch (err) {
            this.logger.error('Error creating user:', err);

            throw new RegisterException(
                err.message,
                'Register exception'
            )
        }
    }

    async findOne(username: string): Promise<User> {
        return await this.usersRepository.getByUsername(username);
    }

    async getProfileById(id: number): Promise<ProfileDao> {
        return await this.usersRepository.getProfileByUserId(id);
    }
}
