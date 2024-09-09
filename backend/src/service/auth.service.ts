import { LoginDto, CreateUserDto } from "../dto";
import * as jwt from "jsonwebtoken"
import * as bcrypt from "bcrypt"
import { UserService } from "./user.service";
import { BadRequestError, ConflictError, InvalidRefreshToken } from "../errors";
import { AuthConfig } from "../config";
import { Payload, Tokens } from "../interface";
import { generateTokens } from "../utils/generateToken";
import { AppDataSource } from "../data-source";
import { RefreshToken } from "../entity/RefreshToken";
import { RtDetail } from "../type";

export class AuthService {
    private userService: UserService
    constructor() {
        this.userService = new UserService()
    }

    async login(data: LoginDto): Promise<Tokens> {
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
            const { at, rt } = await generateTokens(payload);
            await this.saveRt(user.id, await this.getHash(rt))
            return { at, rt }

        } catch (error) {
            throw error
        }
    }

    async register(data: CreateUserDto) {
        try {
            const user = await this.userService.create(data)

            delete user["password"]
            return user

        } catch (error) {
            console.log(error)
            throw error
        }
    }

    async getRefreshToken(rt_Detail: RtDetail): Promise<Tokens> {
        try {

            const { token_hash } = await AppDataSource.manager.findOneBy(RefreshToken, { user_id: rt_Detail.user.id })

            const isValid = await bcrypt.compare(rt_Detail.refresh_Token, token_hash)
            console.log(isValid)
            if (!isValid)
                throw new InvalidRefreshToken();

            console.log(rt_Detail)

            const { at, rt } = await generateTokens(rt_Detail.user)
            await this.saveRt(rt_Detail.user.id, await this.getHash(rt))

            return { at, rt };
        } catch (error) {
            console.log(error)
            throw error
        }
    }


    async saveRt(user_id: number, rtHash: string) {
        try {
            let userRt = await AppDataSource.manager.findOne(RefreshToken, { where: { user_id: user_id } })

            if (!userRt) {
                userRt = new RefreshToken()
                userRt.user_id = user_id
                userRt.token_hash = rtHash
            }

            userRt.token_hash = rtHash
            await AppDataSource.manager.save(RefreshToken, userRt)
        } catch (error) {
            throw error
        }
    }

    async getHash(data: string) {
        return await bcrypt.hash(data, 10);
    }
}