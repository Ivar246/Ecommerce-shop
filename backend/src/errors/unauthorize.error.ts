import BaseError from "./Base.error";

export class UnauthorizeError extends BaseError {
    constructor(message: string) {
        super(message, 401, "FORBIDDEN")
    }
}