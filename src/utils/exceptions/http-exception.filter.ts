import {ArgumentsHost, Catch, ExceptionFilter, HttpException} from '@nestjs/common';
import {Response} from 'express';
import GenericException from './generic.exception';
import CustomUnauthorizedException from "../../api/exceptions/custom-unauthorized.exception";

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: GenericException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const status = exception.getStatus();
        const exresponse = exception.getResponse();
        const errorBuilt = HttpExceptionFilter.buildError(exception);
        response.status(status).json(errorBuilt ? errorBuilt.getResponse() : exresponse);
    }

    private static buildError(exception): GenericException {

        switch (exception.name) {
            case 'UnauthorizedException': {
                return new CustomUnauthorizedException(
                    exception.message,
                    'Unauthorized'
                )
            }
        }
    }
}
