import { NextFunction, Response, Request } from "express";
import { CreateUserDto, LoginDto } from "../dto";
import { AuthService } from "../service/auth.service";
import { auditLog } from "../utils/auditLogger";
import { AuditLogAction, LogType, Role } from "../enums";

export class AuthController {
    private authService: AuthService
    constructor() {
        this.authService = new AuthService()
    }

    register = async (req: Request<{}, {}, CreateUserDto>, res: Response, next: NextFunction) => {
        try {
            const user = await this.authService.register(req.body)

            res.status(201).json({ user: user, message: "user registered Successfylly" });

            auditLog({
                action: AuditLogAction.SIGNUP,
                message: "signup Successfull",
                logType: LogType.INFO,
                ip: req.ip,
                module: "Auth",
                user: req.body.role || Role.USER,
                email: req.body.email
            })
        } catch (error) {
            auditLog({
                action: AuditLogAction.SIGNUP,
                message: error.message,
                logType: LogType.ERROR,
                ip: req.ip,
                module: "Auth",
                user: req.body.role || Role.USER,
                email: req.body.email
            })
            next(error)
        }
    }

    login = async (req: Request<{}, {}, LoginDto>, res: Response, next: NextFunction) => {
        try {
            const tokens = await this.authService.login(req.body)

            res.cookie("refresh_token", tokens.rt, {
                maxAge: 60 * 24 * 3600 * 1000,
                httpOnly: true
            })

            res.status(201).json({ access_token: tokens.at, message: "user loggedin Successfylly" });

            auditLog({
                action: AuditLogAction.LOGIN,
                message: "Logged In successfull",
                logType: LogType.INFO,
                ip: req.ip,
                module: "Auth",
                user: Role.USER,
                email: req.body.email
            })

            return;
        } catch (error) {
            auditLog({
                action: AuditLogAction.LOGIN,
                message: error.messge,
                logType: LogType.ERROR,
                ip: req.ip,
                module: "Auth",
                user: Role.USER,
                email: req.body.email
            })
            next(error)
        }
    }
}

export const authController = new AuthController()