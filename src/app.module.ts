import {Module} from '@nestjs/common';
import {ServicesModule} from "./service/service.module";
import {NestPgpromiseModule} from "nestjs-pgpromise";
import {ConfigModule} from "@nestjs/config";
import config from './config/config.default';
import {CustomLogger} from "./config/logger/custom-logger.service";
import {IntegrationModule} from "./integration/integration.module";
import {ApiModule} from "./api/api.module";

@Module({
    imports: [
        ServicesModule,
        ConfigModule.forRoot({
            isGlobal: true,
            load: [config]
        }),
        NestPgpromiseModule.register({
            connection: {
                host: process.env.DB_HOST,
                port: Number(process.env.DB_PORT),
                database: process.env.DB_NAME,
                user: process.env.DB_USER,
                password: process.env.DB_PASSWORD
            },
        }),
        IntegrationModule,
        ApiModule
    ],
    providers: [CustomLogger],
})
export class AppModule {
}
