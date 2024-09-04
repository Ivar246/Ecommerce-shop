import express, { NextFunction, Request, Response } from "express";
import cors from "cors"
import * as bcrypt from "bcrypt"
import { AppDataSource } from "./data-source";
import { appConfig } from "./config";
import productRoute from "./route/product.route"
import authRoute from "./route/auth.route"
import cartRoute from "./route/cart.route"
import checkoutRoute from "./route/checkout.route"
import userRoute from "./route/user.route"
import orderRoute from "./route/order.route"
import BaseError from "./errors/Base.error";
import { User } from "./entity/User";
import { Role } from "./enums";

const app = express()


app.use(cors())

app.use(express.json())

AppDataSource.initialize().then((dataSource) => {
    console.log("Database connected successfully.")

    // const user = new User()
    // user.username = "ravi"
    // user.email = "ravistha@gmail.com"
    // user.password = bcrypt.hashSync("ravistha", 10)
    // user.role = Role.ADMIN

    // dataSource.manager.save(User, user)

    return
}).then(() => {

    app.use("/api/product", productRoute);
    app.use("/api/auth", authRoute);
    app.use("/api/user", userRoute)
    app.use("/api/cart", cartRoute);
    app.use("/api/checkout", checkoutRoute)
    app.use("/api/order", orderRoute)

    // error handling middleware
    app.use((err: BaseError, req: Request, res: Response, next: NextFunction) => {
        if (!err.status) {
            err.status = 500
            err.name = "INTERNAL SERVER ERROR"
        }

        res.status(err.status).json({ message: err.message, error: err.name, status: err.status });
    })

    app.listen(appConfig.PORT, () => {
        console.log(`listening on port ${appConfig.PORT}`)
    })

}).catch(error => {
    console.log("database connection failed.")
    console.log(error)
});





