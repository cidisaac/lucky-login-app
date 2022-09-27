import {ConsoleLogger, Injectable, Scope} from "@nestjs/common";

@Injectable({scope: Scope.TRANSIENT})
export class CustomLogger extends ConsoleLogger {
    info(message: string, metadata?: {}) {
        this.log(`${message}, metadata: ${JSON.stringify(metadata)}`);
    }
}