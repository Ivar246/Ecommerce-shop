import BaseError from "./Base.error";

export class ConflictError extends BaseError {
    constructor(message: string, title: string = "CONFLICT") {
        super(message, 409, title)
    }
}