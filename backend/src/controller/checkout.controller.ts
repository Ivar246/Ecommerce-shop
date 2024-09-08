import { NextFunction, Request, Response } from "express"
import { checkoutService } from "../service/checkout.service"
import { auditLog } from "../utils/auditLogger";
import { AuditLogAction, LogType } from "../enums";

export class CheckoutController {

    checkout = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const order = await checkoutService.checkout(req.user.id);
            res.status(201).json({ data: order, message: "Checkout successfull, Your order has been created" })

            auditLog({
                action: AuditLogAction.CHECKOUT,
                message: "Checkout successfull",
                logType: LogType.INFO,
                ip: req.ip,
                module: "Checkout",
                user: req.user.role,
                email: req.user.email
            })

            return
        } catch (error) {

            auditLog({
                action: AuditLogAction.CHECKOUT,
                message: error.message,
                logType: LogType.ERROR,
                ip: req.ip,
                module: "Checkout",
                user: req.user.role,
                email: req.user.email
            })

            next(error)
        }
    }

}

export const checkoutController = new CheckoutController();