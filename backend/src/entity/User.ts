import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Role } from "../enums";

@Entity("users")
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column("varchar")
    username: string

    @Column({
        type: "varchar",
        unique: true
    })
    email: string

    @Column({
        type: "varchar",

    })
    password: string

    @Column({
        type: "enum",
        enum: Role,
        default: Role.USER
    })
    role: Role
    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date
}