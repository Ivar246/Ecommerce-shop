import { Router } from "express";
import { productController } from "../controller/product.controller";
import authenticated from "../middleware/authenticate.middleware";
import authorize from "../middleware/authorize.middleware";
import { Role } from "../enums";


const router = Router()

/**
 * @openapi
 * /api/product/products:
 *   get:
 *     tags:
 *       - Products
 *     summary: Get all products
 *     description: Retrieve all products from the database. Accessible by all types of users.
 *     responses:
 *       200:
 *         description: Successfully fetched products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: "#/components/schemas/Product"
 *       400:
 *         description: Bad request or invalid parameters
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ErrorResponse"
 *       404:
 *         description: Products not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ProductNotFoundError"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Error_500"
 */
router.get("/products", productController.getProducts)

/**
 * @openapi
 * /api/product/{product_id}:
 *   get:
 *     tags:
 *       - Products
 *     summary: Get a single product by product_id
 *     parameters:
 *       - name: product_id
 *         in: path
 *         description: The ID of the product
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully retrieve the product
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       400:
 *         description: Bad request or invalid parameters
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Product not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProductNotFoundError'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error_500'
 */
router.get("/:product_id", productController.getProduct)

/**
/**
 * @openapi
 * /api/product/create:
 *   post:
 *     tags:
 *       - Products
 *     summary: Create a new product
 *     description: Creates a new product. This endpoint is accessible only to admin users.
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             $ref: "#/components/schemas/CreateProductInput"
 *     responses:
 *       201:
 *         description: Successfully created the product
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Product"
 *       400:
 *         description: Bad request or invalid input
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       401:
 *         description: Unauthorized access (e.g., not an admin user)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       409:
 *         description: Conflict, such as duplicate product
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DuplicateProductError'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error_500'
 */
router.post("/create", authenticated, authorize(Role.ADMIN), productController.addProduct)

/**
 * @openapi
 * /api/product/update/{product_id}:
 *   put:
 *     tags:
 *       - Products
 *     summary: Update a product by its ID
 *     description: Updates the details of an existing product. Requires a valid product ID and the updated information in the request body.
 *     parameters:
 *       - name: product_id
 *         in: path
 *         description: The ID of the product to be updated
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             $ref: "#/components/schemas/UpdateProductInput"
 *     responses:
 *       200:
 *         description: Successfully updated the product
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       400:
 *         description: Bad request or invalid input
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Product not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProductNotFoundError'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error_500'
 */
router.put("/update/:product_id", authenticated, authorize(Role.ADMIN), productController.updateProduct)

/**
 * @openapi
 * /api/product/delete/{product_id}:
 *   delete:
 *     tags:
 *       - Products
 *     summary: Delete a product by its ID
 *     description: Removes a product from the database using its unique ID. Requires valid product ID in the path.
 *     parameters:
 *       - name: product_id
 *         in: path
 *         description: The ID of the product to be deleted
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully deleted the product
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Product not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProductNotFoundError'
 *       400:
 *         description: Bad request or invalid input
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
router.delete("/delete/:product_id", authenticated, authorize(Role.ADMIN), productController.removeProduct)

export default router