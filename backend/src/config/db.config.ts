import * as dotenv from "dotenv"
import { DbConfig } from "../interface"

dotenv.config()

export const dbConfig: DbConfig = {
    DB_USER: process.env.DB_USER,
    DB_PASS: process.env.DB_PASS,
    DB_PORT: +process.env.DB_PORT || 5432,
    DB_NAME: process.env.DB_NAME || "task1",
    DB_TYPE: process.env.DB_type || "postgres"
}