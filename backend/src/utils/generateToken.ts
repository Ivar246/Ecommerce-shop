import { Payload, Tokens } from "../interface";
import * as jwt from "jsonwebtoken"
import { AuthConfig } from "../config";

export const generateTokens = async (payload: Payload): Promise<Tokens> => {
    const [access_token, refresh_token] = await Promise.all([jwt.sign(payload, AuthConfig.ACCESS_TOKEN_SECRET, { expiresIn: AuthConfig.ACCESS_TOKEN_EXP }), jwt.sign(payload, AuthConfig.REFRESH_TOKEN_SECRET, { expiresIn: AuthConfig.REFRESH_TOKEN_EXP })])

    return { at: access_token, rt: refresh_token };
}
