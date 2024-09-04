import * as dotenv from "dotenv"

dotenv.config()

export const AuthConfig = {
    ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET
}