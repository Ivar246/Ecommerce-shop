import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"
import { User } from "./User"
import { OrderItem } from "./OrderItem"
import { OrderStatus } from "../enums"

@Entity("orders")
export class Order {
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => User, user => user.orders)
    @JoinColumn()
    user: User

    @OneToMany(() => OrderItem, orderItem => orderItem.order)
    order_items: OrderItem[]

    @Column({
        type: "numeric",
        default: 0
    })
    total_price: number

    @Column({
        type: "enum",
        enum: OrderStatus,
        default: OrderStatus.PENDING
    })
    status: OrderStatus

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date
}