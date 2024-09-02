import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Cart } from "../entity/Cart";
import { CartItem } from "../entity/CartItem";
import { ProductService } from "./product.service";
import { UserService } from "./user.service";
import { BadRequestError } from "../errors";

export class CartService {

    cartRepository: Repository<Cart>
    cartItemRepository: Repository<CartItem>
    productService: ProductService
    userService: UserService

    constructor() {
        this.cartRepository = AppDataSource.getRepository(Cart)
        this.cartItemRepository = AppDataSource.getRepository(CartItem)
        this.productService = new ProductService()
        this.userService = new UserService()
    }

    async addToCart(user_id: number, product_id: number, quantity: number) {
        try {
            const product = await this.productService.getOne(product_id)
            const user = await this.userService.getUserById(user_id)

            let cart = await this.cartRepository.findOne({
                where: {
                    user: { id: user_id }
                }
            })

            if (!cart) {
                cart = this.cartRepository.create();
                cart.cart_items = [];
                cart.user = user
                await this.cartRepository.save(cart)
            }

            let cartItem = cart.cart_items.find((item => item.product.id === product_id))

            if (cartItem)
                cartItem.quantity += quantity;

            else {
                cartItem = this.cartItemRepository.create();
                cartItem.cart = cart
                cartItem.quantity = 1;
                cartItem.product = product
                cart.cart_items.push(cartItem)
            }
            await this.cartItemRepository.save(cartItem)

            return cart

        }
        catch (error) {
            throw error;
        }
    }

    async fetchCartItems(user_id: number) {
        try {
            const cart = await this.cartRepository.findOneBy({ user: { id: user_id } })
            const cartItems = await this.cartItemRepository.find({ where: { cart: { id: cart.id } } })
            return cartItems
        } catch (error) {
            throw error
        }
    }

    async removeCartItem(user_id: number, product_Id: number) {
        try {
            const cart = await this.cartRepository.findOneBy({ user: { id: user_id } });
            const cartItems = await this.cartItemRepository.find({ where: { cart: { id: cart.id } } })

            if (!cartItems.find(cartItem => cartItem.product.id === product_Id))
                throw new BadRequestError("Product not available in cart");

            const filteredCartItems = cartItems.filter(cartItem => cartItem.product.id === product_Id)


            await this.cartRepository.save(filteredCartItems)
        }
        catch (error) {
            throw error
        }
    }
}