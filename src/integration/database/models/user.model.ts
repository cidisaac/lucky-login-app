import CreateUserDto from "../../../api/dtos/create-user.dto";

export default class User {
    id: number;
    username: string;
    password: string;

    constructor(username, password) {
        this.username = username;
        this.password = password;
    }

    static fromCreateUserDto(createUserDto: CreateUserDto): User {
        return new User(
            createUserDto.username,
            createUserDto.password
        );
    }
}