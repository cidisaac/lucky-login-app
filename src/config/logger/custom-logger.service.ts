import {ConsoleLogger, Injectable, LogLevel, Scope} from "@nestjs/common";
import * as MaskData from 'maskdata';
import LogLevelMap from "./LogLevelMap";

const {sensitive_data, tsEnv} = require('../../config/config.default').default();
const maskJSONOptions = {
    // Character to mask the data. Default value is '*'
    maskWith: '*',
    // Field names to mask. Can give multiple fields.
    fields: sensitive_data.split('|') // It should be an array
};

@Injectable({scope: Scope.TRANSIENT})
export class CustomLogger extends ConsoleLogger {

    constructor() {
        super();
        this.setLogLevels(LogLevelMap.getLogLevel(tsEnv))
    }

    setLogLevels(levels: string[]) {
        super.setLogLevels(levels as LogLevel[]);
    }

    info(message: string, metadata?: {}) {
        this.log(`${message}, metadata: ${(CustomLogger.writeMetadata(metadata))}`);
    }

    error(message: string, args?: any) {
        super.error(`${message}, metadata: ${(CustomLogger.writeMetadata(args))}`);
    }

    debug(message: string, args?: any) {
        const params =
            args instanceof Error
                ? {error: CustomLogger.maskData(args)}
                : {metadata: CustomLogger.maskData(args)};

        super.debug(message, params);
    }

    private static writeMetadata(metadata: any): any {
        return metadata ? JSON.stringify(CustomLogger.maskData(metadata)) : {};
    }

    static maskData(args: any): any {
        // to apply too for nested objects/properties
        return MaskData.maskJSONFields(args, maskJSONOptions);
    }
}