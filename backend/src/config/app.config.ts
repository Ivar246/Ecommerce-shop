import * as dotenv from "dotenv";
import { AppConfig } from "../interface";

dotenv.config();

export const appConfig: AppConfig = {
  PORT: +process.env.PORT || 3000,
  FRONTEND_URL: process.env.FRONTEND_URL,
  BACKEND_URL: process.env.BACKEND_URL,
};
