import { Entity, JoinColumn, JoinTable, ManyToMany, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm"
import { User } from "./User"
import { Product } from "./Product"
import { CartItem } from "./CartItem"

@Entity("carts")
export class Cart {
    @PrimaryGeneratedColumn()
    id: number

    @OneToOne(() => User)
    @JoinColumn()
    user: User

    @OneToMany(() => CartItem, cartItem => cartItem.cart)
    cart_items: CartItem[]
}