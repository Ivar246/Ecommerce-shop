import "reflect-metadata"
import { DataSource } from "typeorm";
import { User } from "./entity/User";
import { Product } from "./entity/Product";
import { Cart } from "./entity/Cart";
import { CartItem } from "./entity/CartItem";
import { dbConfig } from "./config";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: dbConfig.DB_PORT,
    username: dbConfig.DB_USER,
    password: dbConfig.DB_PASS,
    database: dbConfig.DB_NAME,
    synchronize: true,
    logging: true,
    entities: [User, Product, Cart, CartItem]
})