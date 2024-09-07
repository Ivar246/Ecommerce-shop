import BaseError from "./Base.error";

export class NotFoundError extends BaseError {
    constructor(message: string, title: string = "NOT FOUND") {
        super(message, 404, title)
    }
}