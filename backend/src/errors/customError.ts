import { BadRequestError } from "./badRequest.error";
import { NotFoundError } from "./notFound.error";

export class ProductNotFoundError extends NotFoundError {
    code: number
    constructor(message: string) {
        super(message, "PRODUCT NOT FOUND")
        this.code = 2000
    }
}


export class DuplicateProductError extends BadRequestError {
    code: number
    constructor(message: string) {
        super(message, "DUPLICATE PRODUCT ERROR")
        this.code = 2001
    }
}
