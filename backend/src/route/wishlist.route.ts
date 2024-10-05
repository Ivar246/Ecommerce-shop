import { Router } from "express";
import authenticated from "../middleware/authenticate.middleware";
import { wishlistController } from "../controller/wishlist.controller";

const router = Router();

router.get("/wishlist/items", authenticated, wishlistController.getItems);

router.post("/wishlist/:product_id", authenticated, wishlistController.addItem);

router.delete(
  "/wishlist/:product_id",
  authenticated,
  wishlistController.removeItem
);

export default router;
