import { NextFunction, Response, Request } from "express"
import { CartService } from "../service/cart.service";
import { AddToCartDto } from "../dto";
import { AddToCartParams } from "../interface";

class CartController {

    private cartService: CartService

    constructor() {
        this.cartService = new CartService()
    }

    addToCart = async (req: Request<AddToCartParams, {}, AddToCartDto>, res: Response, next: NextFunction) => {
        try {
            console.log("hello")
            const cart = await this.cartService.addToCart(req.user.id, +req.params.product_id, req.body.quantity)
            res.status(200).json({
                data: cart
            })
        } catch (error) {
            next(error)
        }
    }

    fetchCartItems = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const cartItems = await this.cartService.fetchCartItems(req.user.id)
            res.status(200).json({ data: cartItems })
        } catch (error) {
            next(error)
        }

    }

    removeCartItem = async (req: Request<AddToCartParams>, res: Response, next: NextFunction) => {
        try {
            const product = await this.cartService.removeCartItem(req.user.id, +req.params.product_id)
            res.status(200).json({ data: product, message: "Items remove successfylly" })
        } catch (error) {
            next(error)
        }
    }

    updateCartItem = async (req: Request<AddToCartParams>, res: Response, next: NextFunction) => {
        try {
            await this.cartService.updateCartItem(req.user.id, req.params.product_id)
            res.status(200).json({ message: "Items remove successfylly" })
        } catch (error) {
            next(error)
        }
    }
}

export const cartController = new CartController()