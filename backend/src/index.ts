import express from "express";
import cors, { CorsOptions } from "cors"
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
import { globalErrorHandler } from "./middleware/globalErrorHandler.middleware";
import cookieParser from "cookie-parser"

const app = express()



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
    const corsOptions: CorsOptions = {
        origin: [appConfig.FRONTEND_URL],
        methods: ["PUT", "GET", "POST", "DELETE"]
    }
    app.use(cors(corsOptions))

    app.use(cookieParser())


    app.use(express.json())
    // morgan logger to log api request info
    apiRequestLogger(app)

    app.use("/api/product", productRoute);
    app.use("/api/auth", authRoute);
    app.use("/api/user", userRoute)
    app.use("/api/cart", cartRoute);
    app.use("/api/checkout", checkoutRoute)
    app.use("/api/order", orderRoute)

    // error handling middleware
    app.use(globalErrorHandler)

    // swagger 
    swaggerDocs(app, appConfig.PORT)

    app.listen(appConfig.PORT, () => {
        console.log(`listening on port ${appConfig.PORT}`)
    })

}).catch(error => {
    console.log("database connection failed.")
    console.log(error)
});





