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
 *     description: Retrieve a list of all items in the cart.Only owner of cart allowed to access this endpoint.
 *     responses:
 *       200:
 *         description: Items fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: "#/components/schemas/CartItem"
 *       500:
 *         description: Internal server error
 */
router.get("/cartItems", authenticated, cartController.fetchCartItems)



/**
 * @openapi
 * /api/cart/delete/{product_id}:
 *   get:
 *     tags:
 *       - Carts
 *     summary: Remove item from cart
 *     description: Only owner of cart is allowed to remove the item from cart. So this api extract the detail of user from req and find their cart and remove the item from cart if item exist 
 *     parameters:
 *       - name: product_id
 *         in: path
 *         description: The ID of the product
 *         required: true
 *         schema:
 *           type: string   
 *     responses:
 *       200:
 *         description: Successfully remove item from cart. Return the deleted item
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/CartItem"
 *       500:
 *         description: Internal server error
 */
router.delete("/removeItem/:product_id", authenticated, cartController.removeCartItem)


/**
 * @openapi
 * /api/cart/addItem/{product_id}:
 *   post:
 *     tags:
 *       - Carts
 *     summary: Add item to cart
 *     description: Add item to cart. If item already exist in the cart just increment its quantity by 1
 *     parameters:
 *       - name: product_id
 *         in: path
 *         description: The ID of the product
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       201:
 *         description: successfully add product to cart. Return the added item
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/CartItem"
 *       500: 
 *         description: Internal server error
 */
router.post("/addItem/:product_id", authenticated, cartController.addToCart)

export default router