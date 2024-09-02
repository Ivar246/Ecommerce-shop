import { Role } from "../enums"

export interface CreateUserDto {
    username: string
    email: string
    password: string
    role?: Role
}