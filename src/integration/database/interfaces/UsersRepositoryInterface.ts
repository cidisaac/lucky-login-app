import User from "../models/User";
import CreateUserDto from "../../../api/dtos/CreateUserDto";

export default interface UsersRepositoryInterface {
    getAll(): Promise<User[]>;

    create(createUserDto: CreateUserDto): Promise<void>;
}