import { MailContext } from "../enums";
import mjml2html from "mjml";
import { accountLockMjml } from "../tempelates/account-lock";
import { sendOTPMjml } from "../tempelates/sendOtp";
import { compile } from "handlebars";

const templateMap = {
  [MailContext.ACCOUNT_LOCK]: accountLockMjml,
  [MailContext.SEND_OTP]: sendOTPMjml,
};

export const sendNotification = (mailContext: MailContext, opts?: {}) => {
  let tempelate = compile(templateMap[mailContext]);

  if (mailContext === MailContext.SEND_OTP) {
    let mjmlTempelate = tempelate(opts);
    const { html } = mjml2html(mjmlTempelate);
  }
};
