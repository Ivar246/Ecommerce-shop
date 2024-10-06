import { Entity, JoinColumn, ManyToOne } from "typeorm";
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
