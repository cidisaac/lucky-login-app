import CreateUserDto from "../../api/dtos/create-user.dto";
import User from "../../integration/database/models/user.model";
import ProfileDao from "../../integration/database/dao/profile.dao";

export default interface UsersServiceInterface {
    register(createUserDto: CreateUserDto): Promise<void>;

    findOne(username: string): Promise<User>;

    getProfileById(id: number): Promise<ProfileDao>;
}