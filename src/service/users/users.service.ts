import {HttpStatus, Injectable} from '@nestjs/common';
import {CustomLogger} from "../../config/logger/custom-logger.service";
import UsersRepository from "../../integration/database/repository/users.repository";
import CreateUserDto from "../../api/dtos/create-user.dto";
import {hash} from "../../utils/hash";
import RegisterException from "../exceptions/register.exception";
import User from "../../integration/database/models/user.model";
import ProfileDao from "../../integration/database/dao/ProfileDao";

@Injectable()
export class UsersService {

    constructor(
        private readonly usersRepository: UsersRepository,
        private readonly logger: CustomLogger) {
        this.logger.setContext(UsersService.name);
    }

    async register(createUserDto: CreateUserDto): Promise<void> {

        try {
            createUserDto.password = await hash(createUserDto.password);
            const data = this.usersRepository.create(createUserDto);

        } catch (err) {
            this.logger.error('Error creating user:', err);

            throw new RegisterException(
                err.message,
                HttpStatus.BAD_REQUEST,
                'REGISTER_EXCEPTION',
                'Register exception')
        }
    }

    async findOne(username: string): Promise<User> {
        return await this.usersRepository.getByUsername(username);
    }

    async getProfileById(id: number): Promise<ProfileDao> {
        return await this.usersRepository.getProfileByUserId(id);
    }
}
