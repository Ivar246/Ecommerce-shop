import { TransportOptions } from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";
import { mailConfig } from "../config";
import { MailOptions } from "nodemailer/lib/json-transport";

export const transportOptions: SMTPTransport.Options = {
  host: "gmail",
  secure: true,
  port: 465,
  auth: {
    type: "LOGIN",
    user: mailConfig.USER,
    pass: mailConfig.PASS,
  },
};
