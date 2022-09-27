import {HttpException} from "@nestjs/common";
import ExceptionDetail from "./ExceptionDetails";

export default class GenericException extends HttpException {
    message: string;
    title: string;
    error_code: string;
    details?: [ExceptionDetail];

    constructor(
        message: string,
        status: number,
        title: string,
        error_code: string,
        details?: [ExceptionDetail]
    ) {

        const error = {
            error: {
                error_code: error_code,
                title: title,
                message: message,
                details: details ? details : []
            }
        };

        super(error, status);
        this.title = title;
        this.error_code = error_code;
        this.message = message;
        this.details = details;
    }
}
