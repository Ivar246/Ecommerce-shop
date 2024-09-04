import { NextFunction, Response, Request } from "express";
import { CreateUserDto, LoginDto } from "../dto";
import { AuthService } from "../service/auth.service";

export class AuthController {
    private authService: AuthService
    constructor() {
        this.authService = new AuthService()
    }

    register = async (req: Request<{}, {}, CreateUserDto>, res: Response, next: NextFunction) => {
        try {
            await this.authService.register(req.body)
            res.status(201).json({ message: "user registered Successfylly" });
        } catch (error) {
            next(error)
        }
    }

    login = async (req: Request<{}, {}, LoginDto>, res: Response, next: NextFunction) => {
        try {
            const result = await this.authService.login(req.body)
            res.status(201).json({ token: result, message: "user loggedin Successfylly" });
        } catch (error) {
            next(error)
        }
    }
}

export const authController = new AuthController()