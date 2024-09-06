import { Router } from "express";
import { orderController } from "../controller/order.controller";
import authenticated from "../middleware/authenticate.middleware";
import authorize from "../middleware/authorize.middleware";
import { Role } from "../enums";
import { OrderRequestValidator } from "../middleware/orderRequestValidator.middleware";


const router = Router()

router.get("/orders", authenticated, orderController.getOrdersByUser)

/**
 * @openapi
 * /api/order/admin/orders:
 *   get:
 *     tags:
 *       - Orders
 *     summary: Get all orders with filtering by status and option to include items
 *     description: Retrieve a list of orders, optionally filtered by status and optionally including order items.
 *     parameters:
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: 
 *             - pending
 *             - shipped
 *             - delivered
 *             - cancelled
 *         required: false
 *         description: Filter orders by their status.
 *       - in: query
 *         name: items
 *         schema:
 *           type: boolean
 *           default: false
 *         required: false
 *         description: Option to include order items in the response (true/false).
 *     responses:
 *       200:
 *         description: List of orders fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/OrdersResponse'
 *       400:
 *         description: Invalid request parameters
 *       500:
 *         description: Internal server error
 */

router.get("/admin/orders", authenticated, authorize(Role.ADMIN), orderController.getAllOrders)

router.put("/admin/update_order_status/:order_id", authenticated, authorize(Role.ADMIN), orderController.updateOrderStatus)


router.get("/:order_id", authenticated, OrderRequestValidator, orderController.getOrder)

export default router