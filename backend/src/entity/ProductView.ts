import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from "typeorm";

@Entity("product_view")
@Unique(["productId", "email"])
export class ProductView {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("int")
  productId: number;

  @Column("varchar")
  email: string;

  @UpdateDateColumn()
  viewedAt: Date;
}
