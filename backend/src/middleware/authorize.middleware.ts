import { NextFunction, Request, Response } from "express";
import { UnauthorizeError } from "../errors";

const authorize = function (role: string) {
    return (req: Request, res: Response, next: NextFunction) => {
        if (req.user.role === role)
            return next()

        next(new UnauthorizeError("unauthorize access"))
    }
}

export default authorize
