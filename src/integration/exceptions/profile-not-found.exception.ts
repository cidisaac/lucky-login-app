import GenericException from "../../utils/exceptions/generic.exception";
import {HttpStatus} from "@nestjs/common";
import {ERROR_CODES} from "../../constants/constants";

export default class ProfileNotFoundException extends GenericException {
    constructor(
        message: string,
        title: string,
        error_code?: string,
        status?: number,
    ) {
        error_code = ERROR_CODES.PROFILE_NOT_FOUND_EXCEPTION;
        status = HttpStatus.NOT_FOUND;
        super(message, status, title, error_code);
    }
}