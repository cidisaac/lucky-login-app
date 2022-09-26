import {Body, Controller, Post} from '@nestjs/common';
import {UsersService} from "../../service/users/users.service";
import CreateUserDto from "../dtos/CreateUserDto";

@Controller('/v1/api')
export class UsersController {
    constructor(private readonly usersService: UsersService) {
    }

    @Post('/register')
    async register(@Body() userDto: CreateUserDto): Promise<void> {
        await this.usersService.register(userDto);
    }
}
