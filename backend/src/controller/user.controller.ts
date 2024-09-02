import { NextFunction, Request, Response } from "express-serve-static-core";
import { UserService } from "../service/user.service";
import { CreateUserDto } from "../dto";
import { UserReqParams } from "../interface";

class UserController {

    private userService: UserService

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

    async getUserById(req: Request<UserReqParams>, res: Response, next: NextFunction) {
        try {
            const user = await this.userService.getUserById(req.params.user_id)

            res.status(200).json({ data: user })
        } catch (error) {
            next(error)
        }
    }


    async getUserByEmail(req: Request<UserReqParams>, res: Response, next: NextFunction) {
        try {
            const user = await this.userService.getUserByEmail(req.params.email)

            res.status(200).json({ data: user })
        } catch (error) {
            next(error)
        }
    }
}