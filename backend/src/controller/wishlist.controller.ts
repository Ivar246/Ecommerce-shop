import { NextFunction, Request, Response } from "express";
import { wishlistService } from "../service/wishlist.service";

class WishlistController {
  addItem = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const response = await wishlistService.addItem(
        req.user.id,
        +req.params["product_id"]
      );

      return res.json(response);
    } catch (error) {
      next(error);
    }
  };

  getItems = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const response = await wishlistService.getItems(req.user.id);
      return res.json(response);
    } catch (error) {
      next(error);
    }
  };

  removeItem = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const response = await wishlistService.deleteItem(
        req.user.id,
        +req.params["product_id"]
      );
      res.json(response);
    } catch (error) {
      next(error);
    }
  };
}

export const wishlistController = new WishlistController();
