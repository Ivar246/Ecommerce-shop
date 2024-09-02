import { NextFunction, Response, Request } from "express";
import { CreateUserDto, LoginDto } from "../dto";
import { AuthService } from "../service/auth.service";

export class AuthController {
    private authService: AuthService
    constructor() {
        this.authService = new AuthService()
    }

    async register(req: Request<{}, {}, CreateUserDto>, res: Response, next: NextFunction) {
        try {
            await this.authService.register(req.body)
            res.status(201).json({ message: "user registered Successfylly" });
        } catch (error) {
            next(error)
        }
    }

    async login(req: Request<{}, {}, LoginDto>, res: Response, next: NextFunction) {
        try {
            const result = await this.authService.login(req.body)
            res.status(201).json({ data: result, message: "user registered Successfylly" });
        } catch (error) {
            next(error)
        }
    }
}

export const authController = new AuthController()