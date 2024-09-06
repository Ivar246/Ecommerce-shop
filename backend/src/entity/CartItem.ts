import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"
import { Product } from "./Product"
import { Cart } from "./Cart"

/**
 * @openapi
 * components:
 *   schemas:
 *     CartItem:
 *       type: object
 *       properties:
 *         id: 
 *           type: number
 *         quantity:
 *           type: number
 *         product:
 *           $ref: '#/components/schemas/Product'
 *         created_at:
 *           type: string
 *           format: date-time
 *         updated_at:
 *           type: string
 *           format: date-time
 *       example:
 *         id: 1
 *         quantity: 2
 *         product:
 *           id: 1
 *           name: Sample Product
 *           description: A sample product
 *           price: 19.99
 *           imageUrl: http://example.com/image.jpg
 *           available_quantity: 100
 *         created_at: '2024-09-06T12:34:56Z'
 *         updated_at: '2024-09-06T12:34:56Z'
 */
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

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date
}