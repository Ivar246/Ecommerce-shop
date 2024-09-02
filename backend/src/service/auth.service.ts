import { LoginDto, CreateUserDto } from "../dto";
import * as jwt from "jsonwebtoken"
import * as bcrypt from "bcrypt"
import { UserService } from "./user.service";
import { BadRequestError, ConflictError } from "../errors";

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

            const token = jwt.sign({ id: user.id, email: user.email }, "dfjadjfak", { expiresIn: "1d" })

            return token
        } catch (error) {
            throw error
        }
    }

    async register(data: CreateUserDto) {
        try {
            //check if user already exist
            let user = await this.userService.getUserByEmail(data.email);
            if (user)
                throw new ConflictError("user already exist")

            // create new user
            user = await this.userService.create(data)
            delete user["password"]
            return user

        } catch (error) {
            throw error
        }
    }
}