import CreateUserDto from "../../../api/dtos/create-user.dto";

export default class Address {
    id: number;
    cityId: number;
    street: string;

    constructor(cityId: number, street: string) {
        this.cityId = cityId;
        this.street = street;
    }

    static fromCreateUserDto(createUserDto: CreateUserDto) {
        return new Address(createUserDto.cityId, createUserDto.address);
    }
}