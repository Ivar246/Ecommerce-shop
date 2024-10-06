import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from "typeorm";
import { Product } from "./Product";
import { Wishlist } from "./Wishlist";

@Entity("wishlist_items")
@Unique(["product", "wishlist"])
export class WishlistItem {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Product, (product) => product.wishlistItems)
  product: Product;

  @ManyToOne(() => Wishlist, (wishlist) => wishlist.wishlistItems)
  wishlist: Wishlist;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
