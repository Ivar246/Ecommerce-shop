import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken"
import { ForbiddenError } from "../errors/forbidden.error";
import { AuthConfig } from "../config";
import { BadRequestError } from "../errors";
import { Payload } from "../interface";

const authenticated = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token)
        next(new ForbiddenError("not allowed"))

    jwt.verify(token, AuthConfig.ACCESS_TOKEN_SECRET, (err, payload: Payload) => {
        if (err)
            next(new ForbiddenError(err.message))
        req.user = payload
    })
    return next()
}

export default authenticated