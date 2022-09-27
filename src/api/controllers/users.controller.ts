import {Body, Controller, Get, Post, Request, UseGuards, UsePipes} from '@nestjs/common';
import {UsersService} from "../../service/users/users.service";
import CreateUserDto from "../dtos/create-user.dto";
import {JoiValidationPipe} from "../../pipes/joi-validation.pipe";
import {createUserSchema} from "../../utils/schemas/create-user.schema";
import {loginUserSchema} from "../../utils/schemas/login-user.schema";
import AuthService from "../../service/auth/auth.service";
import {LocalAuthGuard} from "../../guards/local-auth.guard";
import LoginResponse from "../dtos/login-response";
import {JwtAuthGuard} from "../../guards/jwt-auth.guard";
import {ProfileResponse} from "../dtos/profile-response";
import {JoiValidationGuard} from "../../guards/joi-validation.guard";

@Controller('/v1/api')
export class UsersController {
    constructor(
        private readonly usersService: UsersService,
        private readonly authService: AuthService
    ) {
    }

    @Post('/register')
    @UsePipes(new JoiValidationPipe(createUserSchema))
    async register(@Body() userDto: CreateUserDto): Promise<void> {
        await this.usersService.register(userDto);
    }

    @UseGuards(new JoiValidationGuard(loginUserSchema), LocalAuthGuard)
    @Post('/login')
    async login(@Request() req): Promise<LoginResponse> {
        return await this.authService.login(req.user);
    }

    @UseGuards(JwtAuthGuard)
    @Get('/profile')
    async profile(@Request() req): Promise<ProfileResponse> {
        return req.user;
    }
}
