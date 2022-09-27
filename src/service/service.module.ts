import {Module} from '@nestjs/common';
import {UsersService} from './users/users.service';
import {ConfigurationModule} from "../config/config.module";
import {IntegrationModule} from "../integration/integration.module";
import {PassportModule} from "@nestjs/passport";
import {JwtModule} from "@nestjs/jwt";
import AuthService from "./auth/auth.service";
import JwtStrategy from "./auth/jwt.strategy";
import {LocalStrategy} from "./auth/local.strategy";
import {ConfigService} from "@nestjs/config";

@Module({
    imports: [
        ConfigurationModule,
        IntegrationModule,
        PassportModule,
        JwtModule.registerAsync({
            imports: [ConfigurationModule],
            useFactory: async (configService: ConfigService) => ({
                secret: configService.get('jwt.secret'),
                signOptions: {expiresIn: configService.get('redis.ttl')},
            }),
            inject: [ConfigService]
        }),
    ],
    providers: [
        UsersService,
        AuthService,
        JwtStrategy,
        LocalStrategy
    ],
    exports: [
        UsersService,
        AuthService
    ]
})
export class ServicesModule {
}
