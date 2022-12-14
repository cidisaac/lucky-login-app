import {Module} from "@nestjs/common";
import UsersRepository from "./database/repository/users.repository";
import {CustomLogger} from "../config/logger/custom-logger.service";
import RedisClient from "./cache/redis/redis.client";

@Module({
    providers: [
        {
            provide: 'UsersRepositoryInterface',
            useClass: UsersRepository
        },
        CustomLogger,
        {
            provide: 'CacheClient',
            useClass: RedisClient
        }
    ],
    exports: [
        {
            provide: 'UsersRepositoryInterface',
            useClass: UsersRepository
        },
        {
            provide: 'CacheClient',
            useClass: RedisClient
        }
    ]
})
export class IntegrationModule {
}