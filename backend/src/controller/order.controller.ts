import { NextFunction, Request, Response } from "express-serve-static-core";
import { orderService } from "../service/order.service";
import { AuditLogAction, LogType, OrderStatus } from "../enums";
import { OrderReqParams } from "../interface";
import { auditLog } from "../utils/auditLogger";

class OrderController {

    getOrdersByUser = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const orders = await orderService.getOrdersByUser(req.user.id)

            res.status(200).json({ data: orders })

            auditLog({
                action: AuditLogAction.READ,
                message: "fetch orders",
                logType: LogType.INFO,
                ip: req.ip,
                module: "Order",
                user: req.user.role,
                email: req.user.email
            })

        } catch (error) {

            auditLog({
                action: AuditLogAction.READ,
                message: error.message,
                logType: LogType.ERROR,
                ip: req.ip,
                module: "Order",
                user: req.user.role,
                email: req.user.email
            })

            next(error)
        }
    }

    updateOrderStatus = async (req: Request<OrderReqParams, {}, { status: OrderStatus }>, res: Response, next: NextFunction) => {
        try {
            const updateOrder = await orderService.updateOrderStatus(req.params.order_id, req.body.status)

            res.status(200).json({ data: updateOrder })

            auditLog({
                action: AuditLogAction.UPDATE,
                message: "Update order status",
                logType: LogType.INFO,
                ip: req.ip,
                module: "Order",
                user: req.user.role,
                email: req.user.email
            })

            return
        } catch (error) {

            auditLog({
                action: AuditLogAction.UPDATE,
                message: error.message,
                logType: LogType.ERROR,
                ip: req.ip,
                module: "Order",
                user: req.user.role,
                email: req.user.email
            })

            next(error)
        }
    }

    getAllOrders = async (req: Request<OrderReqParams, {}, { status: OrderStatus }>, res: Response, next: NextFunction) => {
        try {
            const { status, items } = req.query

            const updateOrder = await orderService.getAllOrders(status as OrderStatus, items === "true")

            res.status(200).json({ order: updateOrder })

            auditLog({
                action: AuditLogAction.READ,
                message: "fetch orders",
                logType: LogType.INFO,
                ip: req.ip,
                module: "Order",
                user: req.user.role,
                email: req.user.email
            })

            return

        } catch (error) {

            auditLog({
                action: AuditLogAction.READ,
                message: error.message,
                logType: LogType.ERROR,
                ip: req.ip,
                module: "Order",
                user: req.user.role,
                email: req.user.email
            })

            next(error)
        }
    }

    getOrder = async (req: Request<OrderReqParams>, res: Response, next: NextFunction) => {
        try {

            const order = await orderService.getOrder(+req.params.order_id)

            res.status(200).json({ order })

            auditLog({
                action: AuditLogAction.READ,
                message: "fetch order by id",
                logType: LogType.INFO,
                ip: req.ip,
                module: "Order",
                user: req.user.role,
                email: req.user.email
            })

            return
        } catch (error) {

            auditLog({
                action: AuditLogAction.READ,
                message: error.message,
                logType: LogType.ERROR,
                ip: req.ip,
                module: "Order",
                user: req.user.role,
                email: req.user.email
            })

            next(error)
        }
    }
}

export const orderController = new OrderController()