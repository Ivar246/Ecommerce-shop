import BaseError from "./Base.error";

export class UnauthorizeError extends BaseError {
    constructor(message: string, title: string = "FORBIDDEN") {
        super(message, 401, title)
    }
}