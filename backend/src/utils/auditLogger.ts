import winston from "winston";
import "winston-daily-rotate-file"
import { AppDataSource } from "../data-source";
import { AuditLog } from "../entity/Auditlog";
import { DbTransport } from "./DbTransport";
import DailyRotateFile from "winston-daily-rotate-file";

const transport: DailyRotateFile = new winston.transports.DailyRotateFile({
    filename: 'logs/audit-%DATE%.log',
    datePattern: 'YYYY-MM-DD',
    zippedArchive: true,
    maxSize: '20m',
    maxFiles: '14d',
})

// custom format for console
const consoleLogFormat: winston.Logform.Format = winston.format.combine(
    winston.format.colorize(),
    winston.format.printf(({ level, message, timestamp }) => {
        return `${level}: ${message}`
    })
)


const logger: winston.Logger = winston.createLogger({
    level: "info",
    format: winston.format.combine(
        winston.format.colorize(),
        winston.format.timestamp(),
        winston.format.json()),
    transports: [
        transport,
        new DbTransport({ level: "info" }),
        new winston.transports.Console({ format: consoleLogFormat }),
    ]
})

export default logger;