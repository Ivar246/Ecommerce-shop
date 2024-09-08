import { Router } from "express";
import { checkoutController } from "../controller/checkout.controller";
import authenticated from "../middleware/authenticate.middleware";


const router = Router()

/**
 * @openapi
 * /api/checkout:
 *   post:
 *     tags:
 *       - Checkout
 *     summary: Perform checkout and create orders
 *     description: Initiates a checkout process and creates orders. Returns a list of created orders and a success message.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               cartId:
 *                 type: integer
 *                 example: 123
 *                 description: The ID of the cart to checkout.
 *             required:
 *               - cartId
 *     responses:
 *       200:
 *         description: Orders created successfully after checkout
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Order'
 *                   description: List of created orders.
 *                 message:
 *                   type: string
 *                   example: "Checkout successful"
 *                   description: Success message indicating that the checkout process was successful.
 *       400:
 *         description: Bad request due to invalid input
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       401:
 *         description: Unauthorized access
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
 */
router.post("/", authenticated, checkoutController.checkout)

export default router