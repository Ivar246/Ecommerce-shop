import { Column, CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"

export class Product {
    @PrimaryGeneratedColumn()
    id: number

    @Column({
        type: "string"
    })
    name: string

    @Column({
        type: "string"
    })
    description: string

    price: number

    imageUrl: string

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date
}