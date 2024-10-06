import { networkInterfaces } from "os";
import { AppDataSource } from "../data-source";
import { Product } from "../entity/Product";
import { Review } from "../entity/Review";
import {
  BadRequestError,
  ForbiddenError,
  NotFoundError,
  ProductNotFoundError,
} from "../errors";
import { User } from "../entity/User";
import { Repository } from "typeorm";
import { Payload } from "../interface";
import { Role } from "../enums";

class ReviewService {
  reviewRepository: Repository<Review>;
  constructor() {
    this.reviewRepository = AppDataSource.getRepository(Review);
  }

  addReview = async (
    review_text: string,
    product_id: number,
    user_id: number
  ) => {
    try {
      const product = await AppDataSource.getRepository(Product).findOne({
        where: { id: product_id },
      });

      if (!product) {
        throw new ProductNotFoundError(`product with ${product_id} not found`);
      }

      // check if user has already review the product

      let review = await this.reviewRepository.findOneBy({
        user: { id: user_id },
        product: { id: product_id },
      });

      if (review) {
        throw new BadRequestError(
          "You can review the product only one, You may edit your previous review"
        );
      }

      review = new Review();
      review.review_text = review_text;
      review.product = product;
      review.user = await AppDataSource.getRepository(User).findOneBy({
        id: user_id,
      });

      await this.reviewRepository.save(review);

      const cleanedResult = {
        review_id: review.id,
        review_text: review.review_text,
        product: {
          id: product.id,
          name: product.name,
        },
        user: {
          id: review.user.id,
          username: review.user.username,
        },
      };

      return { data: cleanedResult, message: "review successfull" };
    } catch (error) {
      throw error;
    }
  };

  getProductReviews = async (product_id: number) => {
    try {
      // check product exists or not
      const product = await AppDataSource.getRepository(Product).findOneBy({
        id: product_id,
      });

      if (!product) {
        throw new ProductNotFoundError(
          `product with id ${product_id} not found.`
        );
      }

      const reviews = await this.reviewRepository.find({
        where: { product: { id: product_id } },
        relations: ["user"],
      });

      const cleanedResult = reviews.map((review) => {
        return {
          ...review,
          user: { id: review.user.id, username: review.user.username },
        };
      });

      return { reviews: cleanedResult };
    } catch (error) {
      throw error;
    }
  };

  fetchUserProductReview = async (user_id: number, product_id: number) => {
    try {
      const review = await this.reviewRepository.findOne({
        where: { user: { id: user_id }, product: { id: product_id } },
      });

      return { review };
    } catch (error) {}
  };

  editReview = async (
    user: Payload,
    review_id: number,
    review_text: string
  ) => {
    try {
      const review = await this.reviewRepository.findOne({
        where: { id: review_id },
        relations: ["user"],
      });
      // check review exist or not
      if (!review) {
        throw new NotFoundError(
          `review with id ${review_id} not found`,
          "REVIEW NOT FOUND"
        );
      }

      // check ownership
      if (review.user.id !== user.id) {
        throw new ForbiddenError("You are not allowed to modify this review.");
      }

      const updatedReview = await this.reviewRepository.update(review_id, {
        review_text: review_text,
      });

      return {
        updatedReview: updatedReview,
        message: "Review updated successfully.",
      };
    } catch (error) {
      throw error;
    }
  };

  //   deleteReview = () => {

  //   };
}

export const reviewService = new ReviewService();
