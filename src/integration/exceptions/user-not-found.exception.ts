import GenericException from "../../utils/exceptions/generic.exception";
import {HttpStatus} from "@nestjs/common";
import {ERROR_CODES} from "../../constants/constants";

export default class UserNotFoundException extends GenericException {
    constructor(
        message: string,
        title: string,
        status?: number,
        error_code?: string,
    ) {
        status = HttpStatus.NOT_FOUND;
        error_code = ERROR_CODES.USER_NOT_FOUND_EXCEPTION;
        super(message, status, error_code, title);
    }
}