import BaseError from "./Base.error";

export class BadRequestError extends BaseError {
    constructor(message: string) {
        super(message, 400, "BAD REQUEST")
    }
}