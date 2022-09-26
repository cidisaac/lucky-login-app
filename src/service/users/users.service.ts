import {Injectable} from '@nestjs/common';
import {CustomLogger} from "../../config/logger/custom-logger.service";
import UsersRepository from "../../integration/database/repository/UsersRepository";
import CreateUserDto from "../../api/dtos/CreateUserDto";
import {hash} from "../../utils/hash";

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
        }
    }
}
