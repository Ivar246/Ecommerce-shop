import { Router } from "express";
import { orderController } from "../controller/order.controller";
import authenticated from "../middleware/authenticate.middleware";
import authorize from "../middleware/authorize.middleware";
import { Role } from "../enums";
import { OrderRequestValidator } from "../middleware/orderRequestValidator.middleware";


const router = Router()

/**
 * @openapi
 * /api/order/user/orders:
 *   get:
 *     tags:
 *       - Orders
 *     summary: Get all orders with filtering by status and option to include items
 *     description: Retrieve a list of orders, optionally filtered by status and optionally including order items. This route is for user.
 *     parameters:
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: 
 *             - pending
 *             - Accepted
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
 *                 $ref: "#/components/schemas/OrderWithOrderItems"
 *       400:
 *         description: Invalid request parameters
 *         content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/ErrorResponse"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Error_500"
 */
router.get("/user/orders", authenticated, orderController.getOrdersByUser)

/**
 * @openapi
 * /api/order/admin/orders:
 *   get:
 *     tags:
 *       - Orders
 *     summary: Get all orders with filtering by status and option to include items
 *     description: Retrieve a list of orders, optionally filtered by status and optionally including order items. This route is for admin
 *     parameters:
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: 
 *             - pending
 *             - Accepted
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
 *                 $ref: "#/components/schemas/AdminOrders"
 *       400:
 *         description: Invalid request parameters
 *         content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/ErrorResponse"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Error_500"
 */
router.get("/admin/orders", authenticated, authorize(Role.ADMIN), orderController.getAllOrders)


/**
 * @openapi
 * /api/admin/update_order_status/{order_id}:
 *   put:
 *     tags:
 *       - Orders
 *     summary: Update the status of an order
 *     description: Allows an admin to update the status of a specific order.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: order_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the order to update
 *       - in: body
 *         name: status
 *         required: true
 *         description: The new status of the order
 *         schema:
 *           type: object
 *           properties:
 *             status:
 *               type: string
 *               enum:
 *                 - pending
 *                 - accepted
 *                 - rejected
 *                 - shipped
 *                 - delivered
 *               example: accepted
 *     responses:
 *       200:
 *         description: Order status updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Order"
 *       400:
 *         description: Invalid request parameters or order not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ErrorResponse"
 *       401:
 *         description: Unauthorized access
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ErrorResponse"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Error_500"
 */
router.put("/admin/update_order_status/:order_id", authenticated, authorize(Role.ADMIN), orderController.updateOrderStatus)

/**
 * @openapi
 * /api/orders/{order_id}:
 *   get:
 *     tags:
 *       - Orders
 *     summary: Retrieve a specific order by ID
 *     description: Fetch details of a specific order using its unique ID. Only owner of order and admin can view this.
 *     parameters:
 *       - in: path
 *         name: order_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the order to retrieve.
 *     responses:
 *       200:
 *         description: Order details retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/OrderWithOrderItems'
 *       400:
 *         description: Invalid order ID supplied
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Order not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error_500'
 *     security:
 *       - bearerAuth: []
 */
router.get("/:order_id", authenticated, OrderRequestValidator, orderController.getOrder)

export default router