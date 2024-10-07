import express from "express";
import cors, { CorsOptions } from "cors";
import * as bcrypt from "bcrypt";
import { AppDataSource } from "./data-source";
import { appConfig } from "./config";
import productRoute from "./route/product.route";
import authRoute from "./route/auth.route";
import cartRoute from "./route/cart.route";
import checkoutRoute from "./route/checkout.route";
import userRoute from "./route/user.route";
import orderRoute from "./route/order.route";
import wishlistRoute from "./route/wishlist.route";
import BaseError from "./errors/Base.error";
import { User } from "./entity/User";
import { AuditLogAction, LogType, Role } from "./enums";
import swaggerUi from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerDocs from "./swagger";
import { apiRequestLogger } from "./utils/apiRequestLogger";
import { globalErrorHandler } from "./middleware/globalErrorHandler.middleware";
import cookieParser from "cookie-parser";
import path from "path";
import passport from "passport";
import { useGoogleStrategy } from "./passport/googleStrategy";
import session from "express-session";

const app = express();

AppDataSource.initialize()
  .then((dataSource) => {
    console.log("Database connected successfully.");

    // const user = new User()
    // user.username = "ravi"
    // user.email = "ivar@gmail.com"
    // user.password = bcrypt.hashSync("ravistha", 10)
    // user.role = Role.ADMIN

    // dataSource.manager.save(User, user)
    return;
  })
  .then(() => {
    const corsOptions: CorsOptions = {
      methods: ["PUT", "GET", "POST", "DELETE"],
    };

    app.use(cors(corsOptions));

    app.use(cookieParser());

    // serve static file

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    // passport

    app.use(passport.initialize());
    app.use(
      session({
        secret: "secret",
        resave: false,
        saveUninitialized: true,
      })
    );

    useGoogleStrategy(passport);
    // morgan logger to log api request info
    apiRequestLogger(app);
    app.use(
      "/uploads",
      express.static(path.resolve(__dirname, "..", "uploads"))
    );

    app.use("/api/product", productRoute);
    app.use("/api/auth", authRoute);
    app.use("/api/user", userRoute);
    app.use("/api/cart", cartRoute);
    app.use("/api/checkout", checkoutRoute);
    app.use("/api/order", orderRoute);
    app.use("/api/wishlist", wishlistRoute);

    // error handling middleware
    app.use(globalErrorHandler);

    // swagger
    swaggerDocs(app, appConfig.PORT);

    app.listen(appConfig.PORT, () => {
      console.log(`listening on port ${appConfig.PORT}`);
    });
  })
  .catch((error) => {
    console.log("database connection failed.");
    console.log(error);
  });
