import BaseError from "./Base.error";

export class BadRequestError extends BaseError {
    constructor(message: string, title: string = "BAD REQUEST") {
        super(message, 400, title)
    }
}