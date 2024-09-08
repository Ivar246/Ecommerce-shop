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
 *     description: retrieve all product from database. Accessed by all type of user
 *     responses:
 *       200:
 *         description: successfully fetched
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items: 
 *                 $ref: "#/components/schemas/Product"
 *       400: 
 *         description: failed to retrieve product
 * 
 */
router.get("/products", productController.getProducts)

/**
 * @openapi
 * /api/product/{product_id}:
 *   put:
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
 *       404:
 *         description: Product not found
 *       400:
 *         description: Bad request
 */
router.get("/:product_id", productController.getProduct)

/**
 * @openapi
 * /api/product/create:
 *   post:
 *     tags:
 *       - Products
 *     summary: create new product
 *     description: Create New product. Only for admin
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             $ref: "#/components/schemas/CreateProductInput"
 *     responses:
 *       201:
 *         description: Successfull
 *         content:
 *            application/json:
 *              schema:
 *                 $ref: "#/components/schema/Product"
 *       400:
 *          description: failure
 *          content:
 *             application/json:
 *               
 */
router.post("/create", authenticated, authorize(Role.ADMIN), productController.addProduct)

/**
 * @openapi
 * /api/product/update/{product_id}:
 *   put:
 *     tags:
 *       - Products
 *     summary: Update product by product_id
 *     parameters:
 *       - name: product_id
 *         in: path
 *         description: The ID of the product
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
 *         description: Successfully update the product
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Product not found
 *       400:
 *         description: Bad request
 */
router.put("/update/:product_id", authenticated, authorize(Role.ADMIN), productController.updateProduct)

/**
 * @openapi
 * /api/product/delete/{product_id}:
 *   put:
 *     tags:
 *       - Products
 *     summary: delete product by product_id
 *     parameters:
 *       - name: product_id
 *         in: path
 *         description: The ID of the product
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully delete the product
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Product not found
 *       400:
 *         description: Bad request
 *         content:
 *           application/json: 
 */
router.delete("/delete/:product_id", authenticated, authorize(Role.ADMIN), productController.removeProduct)

export default router