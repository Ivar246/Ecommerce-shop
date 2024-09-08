import { Column, CreateDateColumn, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Role } from "../enums";
import { Checkout } from "./Checkout"
import { Cart } from "./Cart";
import { Order } from "./Order";
import { Exclude } from "class-transformer";

/**
 * @openapi
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *           example: 1
 *         username:
 *           type: string
 *           example: john_doe
 *         email:
 *           type: string
 *           example: john@example.com
 *         role:
 *           type: string
 *           enum:
 *             - USER
 *             - ADMIN
 *           example: USER
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: 2024-09-07T15:53:00.000Z
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           example: 2024-09-07T15:53:00.000Z
 */

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
    @Exclude()
    password: string

    @Column({
        type: "enum",
        enum: Role,
        default: Role.USER
    })
    role: Role

    @OneToMany(() => Checkout, checkout => checkout.user)
    checkouts: Checkout[]

    @OneToOne(() => Cart, cart => cart.user, { cascade: true })
    cart: Cart

    @OneToMany(() => Order, order => order.user, { cascade: true })
    orders: Order[]

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

}