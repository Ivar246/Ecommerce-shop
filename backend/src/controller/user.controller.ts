import { NextFunction, Request, Response } from "express";
import { UserService } from "../service/user.service";
import { CreateUserDto } from "../dto";

class UserController {

    userService: UserService

    constructor() {
        this.userService = new UserService()
    }

    async createUser(req: Request<{}, {}, CreateUserDto>, res: Response, next: NextFunction) {
        try {
            const user = await this.userService.create(req.body)

            res.status(201).json({ data: user })
        } catch (error) {
            next(error)
        }
    }

    deleteUser() {

    }
}