import GenericException from "../../utils/exceptions/generic.exception";
import {HttpStatus} from "@nestjs/common";
import {ERROR_CODES} from "../../constants/constants";

export default class CreateUserException extends GenericException {
    constructor(
        message: string,
        title: string,
        status?: number,
        error_code?: string,
    ) {
        status = HttpStatus.BAD_REQUEST;
        error_code = ERROR_CODES.CREATE_USER_EXCEPTION;
        super(message, status, title, error_code);
    }
}