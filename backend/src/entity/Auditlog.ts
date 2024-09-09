import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';
import { AuditLogAction, LogType, Role } from '../enums';


@Entity()
export class AuditLog {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: "enum",
        enum: AuditLogAction,
        default: AuditLogAction.CREATE
    })
    action: AuditLogAction

    @Column({
        type: "enum",
        enum: LogType,
        default: LogType.INFO
    })
    logType: LogType

    @Column({
        type: "enum",
        enum: Role,
        default: Role.USER
    })
    user: string;

    @Column({ type: "varchar" })
    user_email: string

    @Column("varchar")
    module: string;

    @Column('text')
    message: string;

    @Column({ type: "varchar" })
    ip_address: string

    @CreateDateColumn()
    datetime: Date;
}
