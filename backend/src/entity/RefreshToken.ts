import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity("refresh_token")
export class RefreshToken {
    @PrimaryGeneratedColumn()
    id: number

    @Column({
        type: "int",
        unique: true
    })
    user_id: number

    @Column({ type: "varchar", nullable: true })
    token_hash: string

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    updated_at: Date
}