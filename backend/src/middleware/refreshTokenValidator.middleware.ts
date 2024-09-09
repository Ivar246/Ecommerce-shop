import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken"
import { AuthConfig } from "../config";
import { Payload } from "../interface";
import { InvalidRefreshToken, TokenExpiredError } from "../errors";

export const validateRefreshToken = (req: Request, res: Response, next: NextFunction) => {
    const refreshToken = req.cookies.refresh_token
    if (!refreshToken)
        throw new InvalidRefreshToken()

    jwt.verify(refreshToken, AuthConfig.REFRESH_TOKEN_SECRET, (err: jwt.VerifyErrors | null, payload: Payload) => {
        if (err) {
            if (err instanceof jwt.TokenExpiredError) {
                next(new TokenExpiredError())
            }
            if (err instanceof jwt.JsonWebTokenError) {
                next(new InvalidRefreshToken())
            }
        }

        req.rt_detail = { refresh_Token: refreshToken, user: { id: payload.id, email: payload.email, role: payload.role } }
        console.log("payload", payload)
        return next()
    })
}