import {PassportStrategy} from "@nestjs/passport";
import {ExtractJwt, Strategy} from "passport-jwt";
import {Inject, Injectable} from "@nestjs/common";
import {ConfigService} from "@nestjs/config";
import {CustomLogger} from "../../config/logger/custom-logger.service";
import {UsersService} from "../users/users.service";
import {ProfileResponse} from "../../api/dtos/profile-response";
import RedisClient from "../../integration/cache/redis/redis.client";

@Injectable()
export default class JwtStrategy extends PassportStrategy(Strategy) {

    constructor(
        private readonly usersService: UsersService,
        private readonly configService: ConfigService,
        private readonly logger: CustomLogger,
        @Inject('CacheClient') private readonly redis: RedisClient) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: 'secretKKKKEY',
        });

        this.logger.setContext(JwtStrategy.name)
    }

    async validate(payload: any): Promise<ProfileResponse> {
        let profile = JSON.parse(await this.redis.get(payload.sub));
        if (!profile) {
            profile = await this.usersService.getProfileById(payload.sub);
            this.redis.set(payload.sub, JSON.stringify(profile), payload.exp - payload.iat)
            this.logger.info('Saved on redis with user id key ', {key: payload.sub});
        }
        this.logger.info('Profile obtained', profile);
        return ProfileResponse.fromDao(profile);
    }
}