import BaseError from "./Base.error";

export class NotFoundError extends BaseError {
    constructor(message: string) {
        super(message, 404, "NOT FOUND")
    }
}