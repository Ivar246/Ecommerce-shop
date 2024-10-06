import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  UpdateDateColumn,
} from "typeorm";
import { User } from "./User";
import { Product } from "./Product";

@Entity("comments")
export class Comment {
  id: number;

  @ManyToOne(() => User, (user) => user.comments, { onDelete: "CASCADE" })
  user: User;

  @ManyToOne(() => Product, (product) => product.comments, {
    onDelete: "CASCADE",
  })
  product: Product;

  @Column({ type: "varchar", length: 150 })
  comment: string;

  @CreateDateColumn()
  created_at: string;

  @UpdateDateColumn()
  updated_at: string;
}
