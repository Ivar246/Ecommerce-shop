import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from "typeorm";

@Entity("product_view")
@Unique(["productId", "ip"])
export class ProductView {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("int")
  productId: number;

  @Column("varchar")
  ip: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
