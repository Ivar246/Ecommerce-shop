import { Router } from "express";
import { orderController } from "../controller/order.controller";
import authenticated from "../middleware/authenticate.middleware";
import authorize from "../middleware/authorize.middleware";
import { Role } from "../enums";
import { OrderRequestValidator } from "../middleware/orderRequestValidator.middleware";


const router = Router()

router.get("/orders", authenticated, orderController.getOrdersByUser)
router.get("/admin/orders", authenticated, authorize(Role.ADMIN), orderController.getAllOrders)
router.put("/admin/update_order_status/:order_id", authenticated, authorize(Role.ADMIN), orderController.updateOrderStatus)
router.get("/:order_id", authenticated, OrderRequestValidator, orderController.getOrder)

export default router