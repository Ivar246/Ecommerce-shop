import express, { NextFunction, Request, Response } from "express";
import { AppDataSource } from "./data-source";
import { appConfig } from "./config";
import productRoute from "./route/product.route"
import authRoute from "./route/auth.route"
import cartRoute from "./route/cart.route"
import BaseError from "./errors/Base.error";

const app = express()

async function bootstrap() {
    app.use(express.json())

    await AppDataSource.initialize();

    app.use("/api/product", productRoute);
    app.use("/api/auth", authRoute);
    app.use("/api/cart", cartRoute);

    // error handling middleware
    app.use((err: BaseError, req: Request, res: Response, next: NextFunction) => {
        if (!err.status)
            err.status = 500
        err.name = "INTERNAL SERVER ERROR"

        res.status(err.status).json({ message: err.message, error: err.name, status: err.status });
    })

    app.listen(appConfig.PORT, () => {
        console.log(`listening on port ${appConfig.PORT}`)
    })
}


bootstrap();

