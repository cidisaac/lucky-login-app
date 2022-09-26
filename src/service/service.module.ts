import {Module} from '@nestjs/common';
import {UsersService} from './users/users.service';
import {ConfigurationModule} from "../config/config.module";
import {IntegrationModule} from "../integration/integration.module";

@Module({
    imports: [ConfigurationModule, IntegrationModule],
    providers: [UsersService],
    exports: [UsersService]
})
export class ServicesModule {
}
