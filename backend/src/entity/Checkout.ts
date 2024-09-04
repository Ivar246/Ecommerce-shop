import { CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn, ManyToOne } from "typeorm";
import { User } from "./User";

@Entity('checkout')
export class Checkout {
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => User, (user) => user.checkouts)
    user: User

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updateAt: Date
}
