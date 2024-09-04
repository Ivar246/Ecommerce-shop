import { EntityManager, Or, Repository } from "typeorm"
import { Order } from "../entity/Order"
import { AppDataSource } from "../data-source"
import { OrderItem } from "../entity/OrderItem"
import { Cart } from "../entity/Cart"
import { BadRequestError } from "../errors"
import { Product } from "../entity/Product"
import { User } from "../entity/User"
import { OrderStatus } from "../enums"
import { CartItem } from "../entity/CartItem"

class CheckoutService {
    private userRepository: Repository<User>
    private manager: EntityManager
    constructor() {
        this.userRepository = AppDataSource.getRepository(User)
        this.manager = AppDataSource.manager
    }

    async checkout(user_id: number) {
        try {
            const result = await this.manager.transaction("SERIALIZABLE", async (transactionManager) => {

                // check if cart is empty
                const cart = await transactionManager.findOne(Cart, {
                    where: { user: { id: user_id } },
                    relations: ["cart_items", "cart_items.product"]
                });

                if (!cart || cart.cart_items.length === 0)
                    throw new Error("Cart is empty")

                const currentUser = await this.userRepository.findOne({ where: { id: user_id } })

                // create new order
                let order = transactionManager.create(Order);
                order.user = currentUser;
                order.total_price = 0
                order.status = OrderStatus.PENDING
                await transactionManager.save(Order, order)

                let totalPrice = 0
                for (const cart_item of cart.cart_items) {
                    const product = await transactionManager.findOne(Product, { where: { id: cart_item.product.id } });

                    // check availability of quantity
                    if (cart_item.quantity > product.available_quantity) {
                        throw new BadRequestError(`Insufficient product, ${product.name} `)
                    }

                    if (product.available_quantity === 0) {
                        throw new BadRequestError(`product, ${product.name} out of stock`)
                    }

                    // update product stock
                    product.available_quantity -= cart_item.quantity
                    await transactionManager.save(Product, product);

                    // create new orderItem
                    const orderItem = transactionManager.create(OrderItem, {
                        product: product,
                        quantity: cart_item.quantity,
                        order: order
                    })

                    console.log(await transactionManager.save(OrderItem, orderItem))
                    await transactionManager.delete(CartItem, cart_item.id)
                    // calculate price 
                    totalPrice += product.price * cart_item.quantity
                }

                // saving total price for order 
                order.total_price = totalPrice
                const savedOrder = await transactionManager.save(Order, order)
                console.log("error")

                transactionManager.delete

                // delete cart
                await transactionManager.delete(Cart, cart.id);

                return savedOrder
            });
            return result;

        } catch (error) {
            console.log(error)
            throw error
        }
    }
}


export const checkoutService = new CheckoutService()