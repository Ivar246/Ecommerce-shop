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

            const salt = await bcrypt.genSalt(10)
            const hash = await bcrypt.hash(data.password, salt);

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

    async getUserById(user_id: number, cart: boolean) {
        try {
            const user = await this.userRepository.findOne({
                where: { id: user_id },
                relations: cart ? ["cart", "cart.cart_items.product",] : []
            });
            if (!user)
                throw new NotFoundError(`user with ${user_id} not found`);

            return user
        }
        catch (error) {
            throw error
        }
    }

    getUsers = async () => {
        try {
            const users = await this.userRepository.find({});
            return users
        } catch (error) {
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