import { Router } from "express";
import { userController } from "../controller/user.controller";
import authenticated from "../middleware/authenticate.middleware";
import authorize from "../middleware/authorize.middleware";
import { Role } from "../enums";
import { wishlistController } from "../controller/wishlist.controller";

const router = Router();

router.get("/:user_id", authenticated, userController.getUserById);

router.get(
  "/users",
  authenticated,
  authorize(Role.ADMIN),
  userController.getAllUsers
);

router.get("/wishlist/items", authenticated, wishlistController.getItems);

router.post("/wishlist/:product_id", authenticated, wishlistController.addItem);

router.delete(
  "/wishlist/:product_id",
  authenticated,
  wishlistController.removeItem
);

export default router;
