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
@Index(["productId", "wishlistId"], { unique: true })
export class WishlistItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("int")
  productId: number;

  @ManyToOne(() => Product, (product) => product.wishlistItems)
  @JoinColumn({ name: "productId" })
  product: Product;

  @Column("int")
  wishlistId: number;

  @ManyToOne(() => Wishlist, (wishlist) => wishlist.wishlistItems)
  @JoinColumn({ name: "wishlistId" })
  wishlist: Wishlist;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
