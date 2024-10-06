import { NextFunction, Request, Response } from "express";
import BaseError from "../errors/Base.error";
import { ErrorResponse } from "../interface";
import { MulterError } from "multer";
import { CustomErrorCode } from "../enums/CustomErrorCode.enum";
export const globalErrorHandler = (
  err: ErrorResponse | MulterError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof MulterError) {
    let error: ErrorResponse;
    error.status = 400;
    error.title = "Bad Request";
    if ((err.code = "LIMIT_FILE_SIZE")) {
      error.code = CustomErrorCode.LIMIT_FILE_SIZE;
    }
    error.message = err.message;
    error.title = "MULTER ERROR";
    error.source = {
      fieldName: err.field,
    };

    return res.status(error.status).json(error);
  } else {
    const status = err.status || 500;
    const code = err.code || "HTTP Error Code";
    const title = err.title || "Internal Server Error";
    const message = err.message || "An unexpected error occurred";
    const source = err.source || {};

    res.status(status).json({
      status,
      title,
      message,
      code,
      source,
    });
  }
};
