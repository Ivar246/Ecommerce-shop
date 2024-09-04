import { NextFunction, Request, Response } from "express";
import { Order } from "../entity/Order";
import { AppDataSource } from "../data-source";
import { Role } from "../enums";
import { ForbiddenError, UnauthorizeError } from "../errors";

export const OrderRequestValidator = async (req: Request, res: Response, next: NextFunction) => {
    const { order_id } = req.params

    const order = await AppDataSource.manager.findOne(Order, { where: { id: +order_id }, relations: ['user'] })

    if (order.user.id === req.user.id || req.user.role === Role.ADMIN) {
        return next()
    }

    next(new ForbiddenError("you are to allowed to access this order"))
}

