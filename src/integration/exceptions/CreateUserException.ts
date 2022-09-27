import GenericException from "../../utils/exceptions/generic.exception";

export default class CreateUserException extends GenericException {
    constructor(
        message: string,
        status: number,
        error_code: string,
        title: string
    ) {
        super(message, status, error_code, title);
    }
}