import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { User } from "../entity/User";
import { CreateUserDto } from "../dto";
import * as bcrypt from "bcrypt";
import { ConflictError } from "../errors/conflict.error";
import { NotFoundError } from "../errors/notFound.error";


export class UserService {
    userRepository: Repository<User>
    constructor() {
        this.userRepository = AppDataSource.getRepository(User)
    }

    async create(data: CreateUserDto) {
        try {
            const user = await this.userRepository.findOneBy({ email: data.email })
            if (user)
                throw new ConflictError("User already exist.")

            const hash = await bcrypt.hash(data.password, 10);

            const newUser = this.userRepository.create()
            newUser.email = data.email
            newUser.username = data.username
            newUser.password = hash

            await this.userRepository.save(newUser)

            return newUser
        } catch (error) {
            throw error
        }
    }

    async getUserById(user_id: number) {
        try {
            const user = await this.userRepository.findOneBy({ id: user_id });
            if (!user)
                throw new NotFoundError(`user w${user_id} not found`);

            return user
        }
        catch (error) {
            throw error
        }
    }

    async getUserByEmail(email: string) {
        try {
            const user = await this.userRepository.findOneBy({ email: email });
            if (!user)
                throw new NotFoundError(`user with ${email} not found`);

            return user
        }
        catch (error) {
            throw error
        }
    }



}