import {
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from "typeorm";
import { Product } from "./Product";
import { User } from "./User";

@Entity("product_likes")
@Unique(["user", "product"])
export class ProductLikes {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Product, (product) => product.productLikes)
  product: Product;

  @ManyToOne(() => User, (user) => user.productLikes)
  user: User;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
