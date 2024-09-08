import { NextFunction, Request, Response } from "express"
import { checkoutService } from "../service/checkout.service"

export class CheckoutController {

    checkout = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const order = await checkoutService.checkout(req.user.id);
            return res.status(201).json({ data: order, message: "Checkout successfull, Your order has been created" })
        } catch (error) {
            next(error)
        }
    }

}

export const checkoutController = new CheckoutController();