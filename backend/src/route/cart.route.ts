import { Router } from "express";
import { cartController } from "../controller/cart.controller";
import authenticated from "../middleware/authenticate.middleware";

const router = Router()

/**
 * @openapi
 * /api/cart/cartItems:
 *   get:
 *     tags:
 *       - Carts
 *     summary: Get all items in the cart
 *     description: Retrieve a list of all items in the cart. Only the owner of the cart is allowed to access this endpoint.
 *     responses:
 *       200:
 *         description: Items fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: "#/components/schemas/CartItem"
 *       401:
 *         description: Unauthorized access or user does not own the cart
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UnauthorizedError'
 *       404:
 *         description: Cart not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CartNotFoundError'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error_500'
 */
router.get("/cartItems", authenticated, cartController.fetchCartItems)



/**
 * @openapi
 * /api/cart/delete/{product_id}:
 *   delete:
 *     tags:
 *       - Carts
 *     summary: Remove item from cart
 *     description: Only the owner of the cart is allowed to remove the item from the cart. This API extracts the details of the user from the request, finds their cart, and removes the item from the cart if it exists.
 *     parameters:
 *       - name: product_id
 *         in: path
 *         description: The ID of the product to remove from the cart
 *         required: true
 *         schema:
 *           type: string   
 *     responses:
 *       200:
 *         description: Successfully removed item from cart. Returns the deleted item
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/CartItem"
 *       400:
 *         description: Bad request, e.g., invalid product ID or request data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/BadRequestError"
 *       401:
 *         description: Unauthorized access, e.g., user is not authorized to access or modify the cart
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/UnauthorizedError"
 *       404:
 *         description: Product not found in the cart or cart not found for the user
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/NotFoundError"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Error_500"
 */

router.delete("/removeItem/:product_id", authenticated, cartController.removeCartItem)

/**
 * @openapi
 * /api/cart/addItem/{product_id}:
 *   post:
 *     tags:
 *       - Carts
 *     summary: Add item to cart
 *     description: Add an item to the cart. If the item already exists in the cart, its quantity is incremented by 1.
 *     parameters:
 *       - name: product_id
 *         in: path
 *         description: The ID of the product to add to the cart
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       201:
 *         description: Successfully added product to cart. Returns the added item with updated quantity
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/CartItem"
 *       400:
 *         description: Bad request, e.g., invalid product ID or request data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/BadRequestError"
 *       401:
 *         description: Unauthorized access, e.g., user is not authorized to modify the cart
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/UnauthorizedError"
 *       404:
 *         description: Product not found or cart not found for the user
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ProductNotFound"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Error_500"
 */

router.post("/addItem/:product_id", authenticated, cartController.addToCart)

export default router