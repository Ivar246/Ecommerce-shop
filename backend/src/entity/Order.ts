import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"
import { User } from "./User"
import { OrderItem } from "./OrderItem"
import { OrderStatus } from "../enums"

/**
 * @openapi
 * components:
 *   schemas:
 *     Order:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 14
 *         total_price:
 *           type: string
 *           example: "68000"
 *         status:
 *           type: string
 *           example: "rejected"
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: "2024-09-03T11:19:23.136Z"
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           example: "2024-09-04T08:15:24.485Z"
 *         order_items:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/OrderItem'
 *     OrdersResponse:
 *       type: object
 *       properties:
 *         data:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Order'
*/
@Entity("orders")
export class Order {
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => User, user => user.orders, { eager: true })
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