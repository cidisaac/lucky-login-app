import {PassportStrategy} from "@nestjs/passport";
import {ExtractJwt, Strategy} from "passport-jwt";
import {Injectable} from "@nestjs/common";
import {ConfigService} from "@nestjs/config";
import {CustomLogger} from "../../config/logger/custom-logger.service";
import {UsersService} from "../users/users.service";
import {ProfileResponse} from "../../api/dtos/profile-response";

@Injectable()
export default class JwtStrategy extends PassportStrategy(Strategy) {

    constructor(
        private readonly usersService: UsersService,
        private readonly configService: ConfigService,
        private readonly logger: CustomLogger) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: 'secretKKKKEY',
        });

        this.logger.setContext(JwtStrategy.name)
    }

    async validate(payload: any): Promise<ProfileResponse> {
        const profileDao = await this.usersService.getProfileById(payload.sub);
        return ProfileResponse.fromDao(profileDao);
    }

}