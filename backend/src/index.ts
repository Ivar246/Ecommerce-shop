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
import { AuditLogAction, LogType, Role } from "./enums";
import swaggerUi from "swagger-ui-express"
import swaggerJSDoc from "swagger-jsdoc"
import swaggerDocs from "./swagger"
import { apiRequestLogger } from "./utils/apiRequestLogger";
import logger from "./utils/auditLogger";

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

    apiRequestLogger(app)

    logger.debug({ message: "first log", email: "abc@gmail.com", user: "admin", module: "User", actionType: AuditLogAction.CREATE, logType: LogType.WARN, ip: "0000.000.000.000" })

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

    swaggerDocs(app, appConfig.PORT)
    app.listen(appConfig.PORT, () => {
        console.log(`listening on port ${appConfig.PORT}`)
    })

}).catch(error => {
    console.log("database connection failed.")
    console.log(error)
});





