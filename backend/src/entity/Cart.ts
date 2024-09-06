import { CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"
import { User } from "./User"
import { Product } from "./Product"
import { CartItem } from "./CartItem"


/**
 * @openapi
 * components:
 *   schemas:
 *     Cart:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *         cart_items:
 *           type: array
 *           items: CartItem
 *         description:
 *           type: string
 *         available_quantity:
 *           type: number
 *         product_img:
 *           type: string
 *           format: binary
 *         created_at:
 *           type: string
 *         updated_at:
 *           type: string 
*/

@Entity("carts")
export class Cart {
    @PrimaryGeneratedColumn()
    id: number

    @OneToOne(() => User, user => user.cart)
    @JoinColumn({ name: "user_id" })
    user: User

    @OneToMany(() => CartItem, cartItem => cartItem.cart, { cascade: true })
    cart_items: CartItem[]

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date
}