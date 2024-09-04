import * as dotenv from "dotenv"

dotenv.config()

export const appConfig = {
    PORT: process.env.PORT || 3000,
    FRONTEND_URL: process.env.FRONTEND_URL
}