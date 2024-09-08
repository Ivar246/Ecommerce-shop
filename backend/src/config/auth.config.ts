import * as dotenv from "dotenv"

dotenv.config()

export const AuthConfig = {
    ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
    REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET,
    ACCESS_TOKEN_EXP: process.env.ACCESS_TOKEN_EXP,
    REFRESH_TOKEN_EXP: process.env.REFRESH_TOKEN_EXP
}