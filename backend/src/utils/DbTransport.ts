import Transport from "winston-transport"
import { AppDataSource } from "../data-source";
import { AuditLog } from "../entity/Auditlog"
//
// Inherit from `winston-transport` so you can take advantage
// of the base functionality and `.exceptions.handle()`.
//
export class DbTransport extends Transport {
    constructor(opts: any) {
        super(opts);
        //
        // Consume any custom options here. e.g.:
        // - Connection information for databases
        // - Authentication information for APIs (e.g. loggly, papertrail,
        //   logentries, etc.).
        //

    }

    async log(info: any, callback: () => void) {
        setImmediate(() => {
            this.emit('logged', info);
        });

        // Perform the writing to the remote service
        try {
            const auditLogRepo = AppDataSource.getRepository(AuditLog);
            const auditLog = auditLogRepo.create({
                datetime: new Date(),
                action: info.action,
                logType: info.logType,
                user: info.user,
                module: info.module,
                message: info.message || '',
                ip_address: info.ip,
                user_email: info.email
            });

            await auditLogRepo.save(auditLog);
        } catch (err) {
            console.error('Error saving log to database:', err);
        }

        callback();
    }
};