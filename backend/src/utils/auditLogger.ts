import winston from "winston";
import "winston-daily-rotate-file"
import { DbTransport } from "./DbTransport";
import DailyRotateFile from "winston-daily-rotate-file";
import { AuditLogOpts } from "../interface";


// logType specific color

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
    winston.format.printf(({ level, message, action, module, logType }) => {

        return `${level}: ${message} ${action} ${logType}`
    })
)

const logger: winston.Logger = winston.createLogger({
    level: "info",
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()),
    transports: [
        transport,
        new DbTransport({ level: "info" }),
        new winston.transports.Console({ format: consoleLogFormat }),
    ]
})

export const auditLog = (opts: AuditLogOpts) => {

    logger.info({ ...opts })
}