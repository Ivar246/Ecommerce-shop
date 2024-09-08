import { NextFunction, Response, Request } from "express"
import { CartService } from "../service/cart.service";
import { AddToCartDto } from "../dto";
import { AddToCartParams } from "../interface";
import { auditLog } from "../utils/auditLogger";
import { AuditLogAction, LogType } from "../enums";

class CartController {

    private cartService: CartService

    constructor() {
        this.cartService = new CartService()
    }

    addToCart = async (req: Request<AddToCartParams, {}, AddToCartDto>, res: Response, next: NextFunction) => {
        try {
            console.log("hello")
            const cart = await this.cartService.addToCart(req.user.id, +req.params.product_id, req.body.quantity)


            auditLog({
                action: AuditLogAction.SIGNUP,
                message: "Items added to cart",
                logType: LogType.INFO,
                ip: req.ip,
                module: "Cart",
                user: req.user.role,
                email: req.user.email
            })

            res.status(200).json({
                data: cart
            })
        } catch (error) {
            auditLog({
                action: AuditLogAction.CREATE,
                message: error.messge,
                logType: LogType.ERROR,
                ip: req.ip,
                module: "Cart",
                user: req.user.role,
                email: req.user.email
            })

            next(error)
        }
    }

    fetchCartItems = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const cartItems = await this.cartService.fetchCartItems(req.user.id)
            res.status(200).json({ data: cartItems })

            auditLog({
                action: AuditLogAction.SIGNUP,
                message: "Fetch items from cart",
                logType: LogType.INFO,
                ip: req.ip,
                module: "Cart",
                user: req.user.role,
                email: req.user.email
            })

        } catch (error) {
            auditLog({
                action: AuditLogAction.READ,
                message: error.messge,
                logType: LogType.ERROR,
                ip: req.ip,
                module: "Cart",
                user: req.user.role,
                email: req.user.email
            })

            next(error)
        }

    }

    removeCartItem = async (req: Request<AddToCartParams>, res: Response, next: NextFunction) => {
        try {
            const product = await this.cartService.removeCartItem(req.user.id, +req.params.product_id)
            res.status(200).json({ data: product, message: "Items remove successfylly" })

            auditLog({
                action: AuditLogAction.SIGNUP,
                message: "Items Removef from cart successfully",
                logType: LogType.INFO,
                ip: req.ip,
                module: "Cart",
                user: req.user.role,
                email: req.user.email
            })

        } catch (error) {

            auditLog({
                action: AuditLogAction.DELETE,
                message: error.messge,
                logType: LogType.ERROR,
                ip: req.ip,
                module: "Cart",
                user: req.user.role,
                email: req.user.email
            })


            next(error)
        }
    }

    updateCartItem = async (req: Request<AddToCartParams>, res: Response, next: NextFunction) => {
        try {
            await this.cartService.updateCartItem(req.user.id, req.params.product_id)
            res.status(200).json({ message: "Items remove successfylly" })

            auditLog({
                action: AuditLogAction.SIGNUP,
                message: "Cart Item updated",
                logType: LogType.INFO,
                ip: req.ip,
                module: "Cart",
                user: req.user.role,
                email: req.user.email
            })

        } catch (error) {

            auditLog({
                action: AuditLogAction.UPDATE,
                message: error.messge,
                logType: LogType.ERROR,
                ip: req.ip,
                module: "Cart",
                user: req.user.role,
                email: req.user.email
            })

            next(error)
        }
    }
}

export const cartController = new CartController()