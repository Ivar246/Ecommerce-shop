import morgan from "morgan";
import fs from "fs"
import path from "path"
import { Express } from "express"


const format = ':date[iso] :method :url :status :res[content-length] :response-time ms :user-agent';

const logStream = fs.createWriteStream(path.join(__dirname, "../..", "logs", 'access.log'), { flags: 'a' });

export const apiRequestLogger = (app: Express) => {
    app.use(morgan(format, { stream: logStream }));

    app.use(morgan(format))
};
