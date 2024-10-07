import Transport from "winston-transport";
import { AppDataSource } from "../data-source";
import { AuditLog } from "../entity/Auditlog";
export class DbTransport extends Transport {
  constructor(opts: any) {
    super(opts);
  }

  async log(info: any, callback: () => void) {
    setImmediate(() => {
      this.emit("logged", info);
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
        message: info.message || "",
        ip_address: info.ip,
        user_email: info.email,
      });

      await auditLogRepo.save(auditLog);
    } catch (err) {
      console.error("Error saving log to database:", err);
    }

    callback();
  }
}
