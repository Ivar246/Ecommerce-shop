import "reflect-metadata"
import { DataSource } from "typeorm";
import * as dotenv from "dotenv"

dotenv.config()

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "Ravi Shrestha",
    password: "Root123",
    database: "task1",
    synchronize: true,
    entities: []
})