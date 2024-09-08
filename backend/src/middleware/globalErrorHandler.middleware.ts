import { NextFunction, Request, Response } from "express"
import BaseError from "../errors/Base.error"
import { ErrorResponse } from "../interface"
export const globalErrorHandler = (err: ErrorResponse, req: Request, res: Response, next: NextFunction) => {

    const status = err.status || 500;
    const code = err.code || 500;
    const title = err.title || 'Internal Server Error';
    const message = err.message || 'An unexpected error occurred';
    const source = err.source || {};

    res.status(status).json({
        status,
        title,
        message,
        code,
        source
    });
}