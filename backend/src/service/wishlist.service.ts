import { Equal, Repository } from "typeorm";
import { User } from "../entity/User";
import { AppDataSource } from "../data-source";
import { Wishlist } from "../entity/Wishlist";
import { Product } from "../entity/Product";
import { WishlistItem } from "../entity/WishlistItem";
import { BadRequestError, ProductNotFoundError } from "../errors";

class WishlistService {
  userRepository: Repository<User>;
  wishlistRepository: Repository<Wishlist>;
  wishlistItemRepository: Repository<WishlistItem>;
  constructor() {
    this.userRepository = AppDataSource.getRepository(User);
    this.wishlistRepository = AppDataSource.getRepository(Wishlist);
    this.wishlistItemRepository = AppDataSource.getRepository(WishlistItem);
  }

  addItem = async (user_id: number, product_id: number) => {
    try {
      let wishlist = await this.wishlistRepository.findOne({
        where: {
          user: { id: Equal(user_id) },
        },
      });

      let userWishlist: Wishlist = wishlist;
      // check if wishlist for the given user exist
      if (!wishlist) {
        wishlist = new Wishlist();
        wishlist.user = await this.userRepository.findOne({
          where: { id: Equal(user_id) },
        });
        console.log("kkk");
        userWishlist = await this.wishlistRepository.save(wishlist);
      }

      // check product existence
      const product = await AppDataSource.getRepository(Product).findOne({
        where: { id: Equal(product_id) },
      });

      if (!Product) {
        throw new ProductNotFoundError(`product with ${product_id} not found.`);
      }

      // check if product already on wishlist
      const wishlistItem = await this.wishlistItemRepository.findOne({
        where: {
          product: { id: product_id },
          wishlist: { id: userWishlist.id },
        },
      });

      if (wishlistItem) {
        throw new BadRequestError("Item already exist in wishlist");
      }

      // create new wishlist item
      const newWishlistItem = new WishlistItem();
      newWishlistItem.product = product;
      newWishlistItem.wishlist = userWishlist;

      const savedWishlistItem = await this.wishlistItemRepository.save(
        newWishlistItem
      );

      const filteredWishlistItem = {
        wishlist_id: savedWishlistItem.wishlistId,
        product_id: savedWishlistItem.productId,
        user_id: savedWishlistItem.wishlist.user.id,
        created_at: savedWishlistItem.createdAt,
      };

      return {
        wishlistItem: "filteredWishlistItem",
        message: "Item added to wishlist.",
      };
    } catch (error) {
      throw error;
    }
  };

  getItems = async (user_id: number) => {
    try {
      const wishlist = await this.wishlistRepository.findOne({
        where: { user: { id: Equal(user_id) } },
        relations: ["wishlistItems"],
      });

      if (!wishlist) {
        throw new BadRequestError("wishlist doesn't exist");
      }

      return { data: wishlist, message: "wishlist item fetch successfull." };
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  deleteItem = async (user_id: number, product_id: number) => {
    try {
      const wishlist = await this.wishlistRepository.findOne({
        where: { user: { id: user_id } },
      });

      const wishlistItem = await this.wishlistItemRepository.findOne({
        where: { product: { id: product_id }, wishlist: { id: wishlist.id } },
      });

      if (!wishlistItem) {
        throw new BadRequestError("item doesn't exist on wishlist");
      }

      const removedItem = await this.wishlistItemRepository.delete(
        wishlistItem.id
      );

      return { removedItem: removedItem, message: "Item remove successfully." };
    } catch (error) {
      throw error;
    }
  };
}

export const wishlistService = new WishlistService();
