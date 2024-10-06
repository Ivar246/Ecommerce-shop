import { NextFunction, Request, Response } from "express";
import { reviewService } from "../service/review.service";

class ReviewController {
  addReview = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const response = await reviewService.addReview(
        req.body["review_text"],
        +req.params["product_id"],
        req.user.id
      );

      return res.json(response);
    } catch (error) {
      next(error);
    }
  };

  getProductReviews = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const response = await reviewService.getProductReviews(
        +req.params["product_id"]
      );
      return res.json(response);
    } catch (error) {
      next(error);
    }
  };

  fetchUserProductReview = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const response = await reviewService.fetchUserProductReview(
        req.user.id,
        +req.params["product_id"]
      );
      return res.json(response);
    } catch (error) {
      next(error);
    }
  };

  editReview = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const response = await reviewService.editReview(
        req.user,
        +req.params["review_id"],
        req.body["review_text"]
      );
      return res.json(response);
    } catch (error) {
      next(error);
    }
  };
}

export const reviewController = new ReviewController();
