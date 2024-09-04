import { Router } from "express";
import { productController } from "../controller/product.controller";
import authenticated from "../middleware/authenticate.middleware";
import authorize from "../middleware/authorize.middleware";
import { Role } from "../enums";


const router = Router()

router.get("/products", productController.getProducts)
router.get("/:id", productController.getProduct)
router.post("/create", authenticated, authorize(Role.ADMIN), productController.addProduct)
router.delete("/delete/:id", authenticated, authorize(Role.ADMIN), productController.removeProduct)

export default router