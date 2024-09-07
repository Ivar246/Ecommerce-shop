import { NextFunction, Request, Response } from "express"
import BaseError from "../errors/Base.error"
import { ErrorResponse } from "../interface"
export const globalErrorHandler = (err: ErrorResponse, req: Request, res: Response, next: NextFunction) => {
    if (!err.status) {
        err.status = 500
        err.title = "INTERNAL SERVER ERROR"
    }

    return res.status(err.status).json({ ...err });
}