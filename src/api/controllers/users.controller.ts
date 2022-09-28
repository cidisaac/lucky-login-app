import {Body, Controller, Get, Inject, Post, Request, UseGuards, UsePipes} from '@nestjs/common';
import CreateUserDto from "../dtos/create-user.dto";
import {JoiValidationPipe} from "../../pipes/joi-validation.pipe";
import {createUserSchema} from "../../utils/schemas/create-user.schema";
import {loginUserSchema} from "../../utils/schemas/login-user.schema";
import {LocalAuthGuard} from "../../guards/local-auth.guard";
import LoginResponse from "../dtos/login-response";
import {JwtAuthGuard} from "../../guards/jwt-auth.guard";
import {ProfileResponse} from "../dtos/profile-response";
import {JoiValidationGuard} from "../../guards/joi-validation.guard";
import UsersServiceInterface from "../../service/interfaces/users-service.interface";
import AuthServiceInterface from "../../service/interfaces/auth-service.interface";

@Controller('/v1/api')
export class UsersController {
    constructor(
        @Inject('UsersServiceInterface') private readonly usersService: UsersServiceInterface,
        @Inject('AuthServiceInterface') private readonly authService: AuthServiceInterface
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
