import GenericException from "../../utils/exceptions/generic.exception";
import {HttpStatus} from "@nestjs/common";
import {ERROR_CODES} from "../../constants/constants";

export default class CustomUnauthorizedException extends GenericException {
    constructor(
        message: string,
        title: string,
        status?: number,
        error_code?: string,
    ) {
        status = HttpStatus.UNAUTHORIZED;
        error_code = ERROR_CODES.UNAUTHORIZED_EXCEPTION;
        super(message, status, title, error_code);
    }
}