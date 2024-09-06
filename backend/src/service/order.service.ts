import { FindManyOptions, Repository } from "typeorm";
import { Order } from "../entity/Order";
import { OrderItem } from "../entity/OrderItem";
import { AppDataSource } from "../data-source";
import { BadRequestError } from "../errors";
import { OrderStatus } from "../enums";

class OrderService {

    private orderRepository: Repository<Order>
    private orderItemRepsitory: Repository<OrderItem>

    constructor() {
        this.orderRepository = AppDataSource.getRepository(Order)
        this.orderItemRepsitory = AppDataSource.getRepository(OrderItem)
    }

    async getOrdersByUser(user_id: number): Promise<Order[]> {
        try {
            const orders = await this.orderRepository.find({
                where: { user: { id: user_id } },
                relations: ["order_items", "order_items.product"]
            })

            return orders
        } catch (error) {
            throw error
        }
    }

    async updateOrderStatus(order_id: number, status: OrderStatus): Promise<Order> {
        try {
            const order = await this.orderRepository.findOne({ where: { id: order_id } })

            if (!order)
                throw new BadRequestError(`order with ${order_id} doesn't exist`)
            order.status = status
            const updateOrder = await this.orderRepository.save(order)
            return updateOrder
        } catch (error) {
            throw error
        }
    }

    async getOrder(order_id: number) {
        try {
            const order = await this.orderRepository.findOne({ where: { id: +order_id }, relations: ["order_items", "order_items.product"] })
            return order
        } catch (error) {
            throw error
        }
    }

    async getAllOrders(status: OrderStatus | null = null, items: boolean = false): Promise<Order[]> {
        console.log(items)
        const query: FindManyOptions = {
            where: status ? { status: status } : {},
            relations: items ? ["order_items", "order_items.product"] : []
        }

        console.log(query)
        try {
            const orders = await this.orderRepository.find(query)

            return orders
        } catch (error) {

        }
    }

}

export const orderService = new OrderService()