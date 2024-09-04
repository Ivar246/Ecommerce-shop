import { Router } from "express";
import { cartController } from "../controller/cart.controller";
import authenticated from "../middleware/authenticate.middleware";

const router = Router()

router.get("/cartItems", authenticated, cartController.fetchCartItems)
router.delete("/removeItem/:product_id", authenticated, cartController.removeCartItem)
router.post("/addItem/:product_id", authenticated, cartController.addToCart)

export default router