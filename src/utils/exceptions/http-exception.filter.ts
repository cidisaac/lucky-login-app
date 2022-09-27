import {ArgumentsHost, Catch, ExceptionFilter, HttpException} from '@nestjs/common';
import {Response} from 'express';
import GenericException from './generic.exception';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: GenericException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const status = exception.getStatus();
        const exresponse = exception.getResponse();

        response.status(status).json(exresponse);
    }
}
