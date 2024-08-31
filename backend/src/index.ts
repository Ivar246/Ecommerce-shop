import express from "express";
import { AppDataSource } from "./data-source";
const app = express()

async function bootstrap() {

    await AppDataSource.initialize();

    app.get("/", (req, res, next) => {
        res.send("hello")
    })

    app.listen(3000, () => {
        console.log("listening on port 3000")
    })
}


bootstrap();

