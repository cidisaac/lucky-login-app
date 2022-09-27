import {UsersService} from "../users/users.service";
import {JwtService} from "@nestjs/jwt";
import {isMatch} from "../../utils/hash";
import {Injectable} from "@nestjs/common";

@Injectable()
export default class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService
    ) {
    }

    async validateUser(username: string, pass: string): Promise<any> {
        const user = await this.usersService.findOne(username);
        const passwordMatch = await isMatch(pass, user.password);
        if (user && passwordMatch) {
            const {password, ...result} = user;
            return result;
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