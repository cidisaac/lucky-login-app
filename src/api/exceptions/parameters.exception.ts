import GenericException from "../../utils/exceptions/generic.exception";
import {HttpStatus} from "@nestjs/common";
import {ERROR_CODES} from "../../constants/constants";

export default class ParametersException extends GenericException {
    constructor(
        message: string,
        title: string,
        status?: number,
        error_code?: string,
    ) {
        status = HttpStatus.BAD_REQUEST;
        error_code = ERROR_CODES.PARAMETERS_EXCEPTION;
        super(message, status, title, error_code);
    }
}