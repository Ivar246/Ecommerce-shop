import { Router } from "express";
import { productController } from "../controller/product.controller";

const router = Router()

router.get("/products", productController.getProducts)
router.get("/:id", productController.getProduct)
router.post("/create", productController.addProduct)
router.delete("/delete/:id", productController.removeProduct)


export default router