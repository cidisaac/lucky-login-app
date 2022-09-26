import {Module} from '@nestjs/common';
import {CustomLogger} from "./logger/custom-logger.service";

@Module({
    imports: [],
    providers: [
        CustomLogger
    ],
    exports: [
        CustomLogger,

    ]
})
export class ConfigurationModule {
}