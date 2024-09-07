import BaseError from "./Base.error";

export class ForbiddenError extends BaseError {
    constructor(message: string, title: string = "FORBIDDEN") {
        super(message, 403, title)
    }
}