import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"
import { CartItem } from "./CartItem"
import { OrderItem } from "./OrderItem"

/**
 * @openapi
 * components:
 *   schemas:
 *     CreateProductInput:
 *       type: object
 *       required:
 *         - name
 *         - price
 *         - description
 *         - available_quantity
 *       properties:
 *         name:
 *           type: string
 *           default: product1
 *         price:
 *           type: number
 *           default: 0.00
 *         description:
 *           type: string
 *           default: this is rarely available product in the market
 *         available_quantity:
 *           type: number
 *           default: 0
 *         product_img:
 *           type: string
 *           format: binary
 *           description: Optional product image file upload
 *     UpdateProductInput:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           default: product1
 *         price:
 *           type: number
 *           default: 0.00
 *         description:
 *           type: string
 *           default: this is rarely available product in the market
 *         available_quantity:
 *           type: number
 *           default: 0
 *         product_img:
 *           type: string
 *           format: binary
 *           description: Optional product image file upload        
 *     Product:
 *       type: object
 *       required:
 *         - id
 *         - name
 *         - price
 *         - available_quantity
 *       properties:
 *         id:
 *           type: number
 *         name:
 *           type: string
 *         description:
 *           type: string
 *         price:
 *           type: number
 *           format: float
 *         imageUrl:
 *           type: string
 *           format: uri
 *         available_quantity:
 *           type: integer
 *         created_at:
 *           type: string
 *           format: date-time
 *         updated_at:
 *           type: string
 *           format: date-time
 *       example:
 *         id: 1
 *         name: Sample Product
 *         description: A sample product
 *         price: 19.99
 *         imageUrl: http://example.com/image.jpg
 *         available_quantity: 100
*/


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