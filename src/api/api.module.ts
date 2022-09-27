import {Module} from '@nestjs/common';
import {UsersController} from "./controllers/users.controller";
import {PingController} from "./controllers/ping.controller";
import UsersRepository from "../integration/database/repository/users.repository";
import {ServicesModule} from "../service/service.module";
import {ConfigurationModule} from "../config/config.module";

@Module({
    imports: [
        ServicesModule,
        ConfigurationModule
    ],
    providers: [
        UsersRepository,
    ],
    controllers: [
        UsersController,
        PingController
    ],
    exports: []
})
export class ApiModule {
}