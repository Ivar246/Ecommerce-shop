import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm"
import { Product } from "./Product"
import { Cart } from "./Cart"

@Entity("cart_items")
export class CartItem {
    @PrimaryGeneratedColumn()
    id: number

    @Column({
        type: "int",
        default: 0
    })
    quantity: number

    @ManyToOne(() => Cart, cart => cart.cart_items)
    cart: Cart

    @ManyToOne(() => Product, product => product.cart_items)
    product: Product
}