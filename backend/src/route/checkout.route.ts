import { Router } from "express";
import { checkoutController } from "../controller/checkout.controller";
import authenticated from "../middleware/authenticate.middleware";


const router = Router()

router.post("/", authenticated, checkoutController.checkout)

export default router