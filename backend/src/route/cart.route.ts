import { Router } from "express";
import { cartController } from "../controller/cart.controller";

const router = Router()

router.get("/", cartController.fetchCartItems)
router.delete("/:id", cartController.removeCartItem)
router.post("/addToCart", cartController.addToCart)

export default router