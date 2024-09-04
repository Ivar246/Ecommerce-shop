import { NextFunction, Request, Response } from "express-serve-static-core";
import { orderService } from "../service/order.service";
import { OrderStatus } from "../enums";
import { OrderReqParams } from "../interface";

class OrderController {
    getOrdersByUser = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const orders = await orderService.getOrdersByUser(req.user.id)

            return res.status(200).json({ data: orders })
        } catch (error) {
            next(error)
        }
    }

    updateOrderStatus = async (req: Request<OrderReqParams, {}, { status: OrderStatus }>, res: Response, next: NextFunction) => {
        try {
            const updateOrder = await orderService.updateOrderStatus(req.params.order_id, req.body.status)

            return res.status(200).json({ data: updateOrder })
        } catch (error) {
            next(error)
        }
    }

    getAllOrders = async (req: Request<OrderReqParams, {}, { status: OrderStatus }>, res: Response, next: NextFunction) => {
        try {
            const { status, items } = req.query

            const updateOrder = await orderService.getAllOrders(status as OrderStatus, items === "true")

            return res.status(200).json({ data: updateOrder })
        } catch (error) {
            next(error)
        }
    }

    getOrder = async (req: Request<OrderReqParams>, res: Response, next: NextFunction) => {
        try {

            const order = await orderService.getOrder(+req.params.order_id)

            return res.status(200).json({ data: order })
        } catch (error) {
            next(error)
        }
    }
}

export const orderController = new OrderController()