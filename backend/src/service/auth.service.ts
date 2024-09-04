import { LoginDto, CreateUserDto } from "../dto";
import * as jwt from "jsonwebtoken"
import * as bcrypt from "bcrypt"
import { UserService } from "./user.service";
import { BadRequestError, ConflictError } from "../errors";
import { AuthConfig } from "../config";
import { Payload } from "../interface";

export class AuthService {
    private userService: UserService
    constructor() {
        this.userService = new UserService()
    }

    async login(data: LoginDto) {
        try {
            //check if user already exist
            const user = await this.userService.getUserByEmail(data.email);
            if (!user)
                throw new BadRequestError("user with email doesn't exist");

            const isMatch = await bcrypt.compare(data.password, user.password);
            if (!isMatch)
                throw new BadRequestError("Password doesn't match")

            const payload: Payload = {
                id: user.id,
                email: user.email,
                role: user.role
            }
            const token = jwt.sign(payload, AuthConfig.ACCESS_TOKEN_SECRET, { expiresIn: "1d" })

            return token
        } catch (error) {
            throw error
        }
    }

    async register(data: CreateUserDto) {
        try {
            console.log('oi')
            const user = await this.userService.create(data)
            delete user["password"]
            return user

        } catch (error) {
            console.log(error)
            throw error
        }
    }
}