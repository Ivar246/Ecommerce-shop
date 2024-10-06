import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  UpdateDateColumn,
} from "typeorm";
import { User } from "./User";
import { Product } from "./Product";
import { Comment } from "./Comment";

@Entity("parent_child_comments")
export class ParentChildComment {
  id: number;

  @ManyToOne(() => Comment, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "parentCommentId" })
  parentComment: Comment;

  @ManyToOne(() => Comment, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "childCommentId" })
  childComment: Comment;
}
