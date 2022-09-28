import {JwtService} from "@nestjs/jwt";
import {isMatch} from "../../utils/hash";
import {Inject, Injectable} from "@nestjs/common";
import AuthServiceInterface from "../interfaces/auth-service.interface";
import UsersServiceInterface from "../interfaces/users-service.interface";

@Injectable()
export default class AuthService implements AuthServiceInterface {
    constructor(
        @Inject('UsersServiceInterface') private readonly usersService: UsersServiceInterface,
        private readonly jwtService: JwtService
    ) {
    }

    async validateUser(username: string, pass: string): Promise<any> {
        const user = await this.usersService.findOne(username);

        if (user) {
            const {password, ...result} = user;
            const passwordMatch = await isMatch(pass, user.password);
            return passwordMatch
                ? result
                : null
        }

        return null;
    }

    async login(user: any) {
        const payload = {username: user.username, sub: user.id};
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}