import * as dotenv from "dotenv"

dotenv.config()

export const uploadConfig = {
limits: +process.env.MAX_FILE_SIZE
}
