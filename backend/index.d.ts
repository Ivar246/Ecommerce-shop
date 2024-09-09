import * as express from "express";
import { Payload } from "./src/interface";
import { RtDetail } from "./src/type";

declare global {
    namespace Express {
        interface Request {
            user?: Payload,
            rt_detail?: RtDetail
        }
    }
}