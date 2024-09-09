import { AuditLogAction, LogType } from "../enums";

export interface AuditLogOpts {
    action: AuditLogAction
    module: string
    user: string
    message?: string
    logType: LogType,
    ip: string,
    email: string
}