import nodemailer from "nodemailer";
import { transportOptions } from "../utils/nodemailerOptions";

const transport = nodemailer.createTransport(transportOptions);

const sendmail = async (to: string, from: string, html: string) => {
  return await transport.sendMail({
    to,
    from,
    html,
  });
};
