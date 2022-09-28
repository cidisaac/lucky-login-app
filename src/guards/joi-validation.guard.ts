import {CanActivate, ExecutionContext, Injectable} from "@nestjs/common";
import ParametersException from "../api/exceptions/parameters.exception";
import {ObjectSchema} from "joi";

@Injectable()
export class JoiValidationGuard implements CanActivate {
    constructor(private schema: ObjectSchema) {
    }

    async canActivate(context: ExecutionContext) {
        const req = context.switchToHttp().getRequest().body;
        const {error} = this.schema.validate(req);
        if (error) {
            throw new ParametersException(
                error.message,
                'Parameters exception'
            );
        }

        return req;
    }
}