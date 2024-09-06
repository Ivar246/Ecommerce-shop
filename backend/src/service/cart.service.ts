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

    async addToCart(user_id: number, product_id: number, quantity: number): Promise<CartItem> {
        try {
            const product = await this.productService.getOne(product_id)
            const user = await this.userService.getUserById(user_id, true)
            let cart = await this.cartRepository.findOne({
                where: {
                    user: { id: user_id }
                },
                relations: ["cart_items", "cart_items.product"]
            })
            //check if cart already exist if not create new one
            if (!cart) {
                cart = this.cartRepository.create();
                cart.user = user
                cart.cart_items = []
                await this.cartRepository.save(cart)
            }
            //check if cartItem already exist
            let cartItem = cart.cart_items.find((item => item.product?.id === product_id))

            if (cartItem) {
                // increment cart item
                cartItem.quantity += 1;
                await this.cartItemRepository.save(cartItem)
            }
            else {
                // creating new cartItem
                cartItem = this.cartItemRepository.create();
                cartItem.cart = cart
                cartItem.quantity = 1;
                cartItem.product = product
                await this.cartItemRepository.save(cartItem)
            }

            return cartItem
        }
        catch (error) {
            console.log(error)
            throw error;
        }
    }

    async fetchCartItems(user_id: number) {
        try {
            const cart = await this.cartRepository.findOneBy({ user: { id: user_id } })
            if (!cart)
                return []
            const cartItems = await this.cartItemRepository.find({
                where: { cart: { id: cart.id } },
                relations: ["product"]
            })
            return cartItems
        } catch (error) {
            throw error
        }
    }

    async removeCartItem(user_id: number, product_id: number) {
        try {
            console.log(typeof product_id)
            const cart = await this.cartRepository.findOneBy({ user: { id: user_id } });
            const cartItems = await this.cartItemRepository.find({
                where: { cart: { id: cart.id } },
                relations: ["product"]
            })
            console.log(cartItems)

            if (!cartItems.find(cartItem => cartItem.product?.id === product_id))
                throw new BadRequestError("Product not available in cart");

            const deletedProduct = await this.cartItemRepository.delete({ product: { id: product_id } })

        }
        catch (error) {
            console.log(error)
            throw error
        }
    }

    async updateCartItem(user_id: number, product_id: number) {
        try {
            const cart = await this.cartRepository.findOne({ where: { user: { id: user_id } } });
            const cartItems = await this.cartItemRepository.find({ where: { cart: { id: cart.id } } })

            const cartItem = cartItems.find(cartItem => cartItem.product.id === product_id)
            if (!cartItem)
                throw new BadRequestError("Item to update not found");
            cartItem.quantity += 1;

            await this.cartItemRepository.save(cartItem);

            return cartItems
        } catch (error) {
            throw error;
        }
    }
}