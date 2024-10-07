import * as dotenv from "dotenv";

dotenv.config();

export const AuthConfig = {
  ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET,
  ACCESS_TOKEN_EXP: process.env.ACCESS_TOKEN_EXP,
  REFRESH_TOKEN_EXP: process.env.REFRESH_TOKEN_EXP,
  MAX_FAILED_ATTEMPT: +process.env.MAX_FAILED_ATTEMPT,
  OAUTH_CLIENTID: process.env.OAUTH_CLIENT_ID,
  OAUTH_CLIENT_SECRET: process.env.OAUTH_CLIENT_SECRET,
  OAUTH_REFRESH_TOKEN: process.env.OAUTH_REFRESH_TOKEN,
};
