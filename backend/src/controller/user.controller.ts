import { NextFunction, Request, Response } from "express-serve-static-core";
import { UserService } from "../service/user.service";
import { CreateUserDto } from "../dto";
import { UserReqParams } from "../interface";

class UserController {

    private userService: UserService

    constructor() {
        this.userService = new UserService()
    }

    createUser = async (req: Request<{}, {}, CreateUserDto>, res: Response, next: NextFunction) => {
        try {

            const user = await this.userService.create(req.body)

            res.status(200).json({ data: user })
        } catch (error) {
            next(error)
        }
    }

    getUserById = async (req: Request<UserReqParams>, res: Response, next: NextFunction) => {
        try {
            let { cart } = req.query
            let isCart: boolean;
            if (cart)
                isCart = true
            else
                isCart = false

            const user = await this.userService.getUserById(req.params.user_id, isCart)

            res.status(200).json({ data: user })
        } catch (error) {
            next(error)
        }
    }


    getUserByEmail = async (req: Request<UserReqParams>, res: Response, next: NextFunction) => {
        try {
            const user = await this.userService.getUserByEmail(req.params.email)

            res.status(200).json({ data: user })
        } catch (error) {
            next(error)
        }
    }

    getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const users = await this.userService.getUsers();

            res.status(200).json({ data: users })
        } catch (error) {
            next(error)
        }
    }
}

export const userController = new UserController()