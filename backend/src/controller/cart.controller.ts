import { NextFunction, Response, Request } from "express"
import { CartService } from "../service/cart.service";
import { AddToCartDto } from "../dto";
import { AddToCartParams } from "../interface";

class CartController {

    private cartService: CartService

    constructor() {
        this.cartService = new CartService()
    }

    addToCart = (req: Request<AddToCartParams, {}, AddToCartDto>, res: Response, next: NextFunction) => {
        try {
            const cart = this.cartService.addToCart(req.user.id, req.params.product_id, req.body.quantity)
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

    removeCartItem = async (req: Request, res: Response, next: NextFunction) => {
        try {
            await this.cartService.removeCartItem(req.user.id, 2)
            res.status(200).json({ message: "Items remove successfylly" })
        } catch (error) {
            next(error)
        }
    }
}

export const cartController = new CartController()