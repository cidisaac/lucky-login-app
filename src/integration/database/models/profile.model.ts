import CreateUserDto from "../../../api/dtos/create-user.dto";

export default class Profile {

    id: number;
    userId: number;
    addressId: number;
    name: string;

    constructor(name) {
        this.name = name;
    }

    static fromCreateUserDto(createUserDto: CreateUserDto): Profile {
        return new Profile(
            createUserDto.name
        );
    }
}