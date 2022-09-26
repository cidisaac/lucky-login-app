import {Module} from "@nestjs/common";
import UsersRepository from "./database/repository/UsersRepository";
import {CustomLogger} from "../config/logger/custom-logger.service";


@Module({
    providers: [UsersRepository, CustomLogger],
    exports: [UsersRepository]
})
export class IntegrationModule {
}