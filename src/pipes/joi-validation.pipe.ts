import {ArgumentMetadata, Injectable, PipeTransform} from '@nestjs/common';
import {ObjectSchema} from 'joi';
import ParametersException from "../api/exceptions/parameters.exception";

@Injectable()
export class JoiValidationPipe implements PipeTransform {
    constructor(private schema: ObjectSchema) {
    }

    transform(value: any, metadata: ArgumentMetadata) {

        const {error} = this.schema.validate(value);
        if (error) {
            throw new ParametersException(
                error.message,
                'Parameters exception'
            );
        }

        return value;
    }
}