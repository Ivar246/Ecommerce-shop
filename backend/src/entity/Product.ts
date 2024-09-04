import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"
import { CartItem } from "./CartItem"
import { OrderItem } from "./OrderItem"

@Entity("products")
export class Product {
    @PrimaryGeneratedColumn()
    id: number

    @Column({
        type: "varchar",
        unique: true
    })
    name: string

    @Column({
        type: "text",
        nullable: true
    })
    description: string

    @Column(
        { type: "numeric" }
    )
    price: number

    @Column({
        type: "varchar",
        nullable: true
    })
    imageUrl: string
    @Column({
        type: "int"
    })
    available_quantity: number

    @OneToMany(() => CartItem, cartItem => cartItem.product)
    cart_items: CartItem[]

    @OneToMany(() => OrderItem, orderItem => orderItem.product)
    order_items: OrderItem[]

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date
}