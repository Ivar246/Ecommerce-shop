import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"
import { Product } from "./Product"
import { Cart } from "./Cart"
import { Order } from "./Order"

@Entity("order_items")
export class OrderItem {
    @PrimaryGeneratedColumn()
    id: number

    @Column({
        type: "int",
        default: 0
    })
    quantity: number

    @ManyToOne(() => Order, order => order.order_items)
    order: Order

    @ManyToOne(() => Product, product => product.order_items)
    product: Product

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date
}