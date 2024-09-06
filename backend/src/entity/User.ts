import { Column, CreateDateColumn, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Role } from "../enums";
import { Checkout } from "./Checkout"
import { Cart } from "./Cart";
import { Order } from "./Order";
import { Exclude } from "class-transformer";
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