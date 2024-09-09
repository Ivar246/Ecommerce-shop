import { Router } from "express";
import { userController } from "../controller/user.controller";
import authenticated from "../middleware/authenticate.middleware";
import authorize from "../middleware/authorize.middleware";
import { Role } from "../enums";


const router = Router()

router.get("/:user_id", authenticated, userController.getUserById)

router.get("/users", authenticated, authorize(Role.ADMIN), userController.getAllUsers)

export default router