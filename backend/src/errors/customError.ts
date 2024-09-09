import { CustomErrorCode } from "../enums/CustomErrorCode.enum";
import { BadRequestError } from "./badRequest.error";
import BaseError from "./Base.error";
import { NotFoundError } from "./notFound.error";

export class ProductNotFoundError extends NotFoundError {
    code: number
    constructor(message: string) {
        super(message, "PRODUCT NOT FOUND")
        this.code = CustomErrorCode.PRODUCT_NOT_FOUND
    }
}


export class DuplicateProductError extends BadRequestError {
    code: number
    constructor(message: string) {
        super(message, "DUPLICATE PRODUCT ERROR")
        this.code = CustomErrorCode.DUPLICATE_PRODUCT
    }
}


export class EmptyCartError extends BadRequestError {
    code: number
    constructor(message: string) {
        super(message, "EMPTY CART")
        this.code = CustomErrorCode.CART_EMPTY
    }
}


export class EmailConflictError extends BadRequestError {
    code: number
    constructor(message: string = "Email already exist in database.") {
        super("", "EMAIL CONFLICT")
        this.code = CustomErrorCode.EMAIL_CONFLICT
    }
}


export class PasswordIncorrectError extends BadRequestError {
    code: number
    constructor(message: string = "Incorrect Password") {
        super(message, "INCORRECT PASSWORD")
        this.code = CustomErrorCode.INCORRECT_PASSWORD
    }
}


export class InvalidRefreshToken extends BaseError {
    code: number
    constructor() {
        super("Invalid Refresh Token", 401, "INVALID REFRESH TOKEN")
        this.code = CustomErrorCode.INVALID_REFRESH_TOKEN
    }
}

export class TokenExpiredError extends BaseError {
    code: number
    constructor() {
        super("Token has been expired", 401, "JWT EXPIRED")
        this.code = CustomErrorCode.TOKEN_EXPIRED
    }
}
