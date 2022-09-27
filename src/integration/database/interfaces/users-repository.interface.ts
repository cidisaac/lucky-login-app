import User from "../models/user.model";
import CreateUserDto from "../../../api/dtos/create-user.dto";
import ProfileDao from "../dao/ProfileDao";

export default interface UsersRepositoryInterface {
    getAll(): Promise<User[]>;

    create(createUserDto: CreateUserDto): Promise<void>;

    getByUsername(username: string): Promise<User>;

    getProfileByUserId(id: number): Promise<ProfileDao>;
}