import { NextFunction, Request, Response } from "express";
import BaseError from "../errors/Base.error";
import { ErrorResponse } from "../interface";
import { MulterError } from "multer";
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
      error.code = 4003;
      error.message = "";
    }

    res.status(error.status).json({
      status: error.status,
      title: error.title,
      message: error.message,
      code: error.code,
      source: {
        fieldName: err.field,
      },
    });
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
