import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"
import { Product } from "./Product"
import { Cart } from "./Cart"
import { Order } from "./Order"

/**
 * @openapi
 * components:
 *   schemas:
 *     OrderItem:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 15
 *         quantity:
 *           type: integer
 *           example: 4
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: "2024-09-03T11:19:23.136Z"
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           example: "2024-09-03T11:19:23.136Z"
 *         product:
 *           $ref: '#/components/schemas/Product'
*/
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