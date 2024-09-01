import BaseError from "./Base.error";

export class ConflictError extends BaseError {
    constructor(message: string) {
        super(message, 409, "CONFLICT")
    }
}