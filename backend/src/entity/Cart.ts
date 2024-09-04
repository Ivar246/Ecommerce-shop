import { CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"
import { User } from "./User"
import { Product } from "./Product"
import { CartItem } from "./CartItem"

@Entity("carts")
export class Cart {
    @PrimaryGeneratedColumn()
    id: number

    @OneToOne(() => User, user => user.cart)
    @JoinColumn()
    user: User

    @OneToMany(() => CartItem, cartItem => cartItem.cart, { cascade: true })
    cart_items: CartItem[]

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date
}