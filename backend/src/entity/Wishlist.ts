import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  ManyToOne,
  OneToOne,
  ManyToMany,
  JoinColumn,
  OneToMany,
} from "typeorm";
import { Product } from "./Product";
import { User } from "./User";
import { WishlistItem } from "./WishlistItem";

@Entity("wishlist")
export class Wishlist {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => User, (user) => user.wishlist, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "userId" })
  user: User;

  @OneToMany(() => WishlistItem, (wishlistItem) => wishlistItem.wishlist)
  wishlistItems: WishlistItem[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
