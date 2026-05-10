const nodemailer = require("nodemailer");
const { SMTPConfig } = require("../config/app.config");

class EmailService {
  #transport;
  constructor() {
    try {
      this.#transport = nodemailer.createTransport({
        host: SMTPConfig.smtpHost,
        port: SMTPConfig.smtpPort,
        service: SMTPConfig.smtpProvider,
        auth: {
          user: SMTPConfig.smtpUser,
          pass: SMTPConfig.smtpPassword,
        },
      });
      console.log("******SMTP Service is connected*********");
    } catch (exception) {
      console.log(exception);

      throw {
        code: 500,
        message: "SMTP CONNECTION FAILED",
        status: "SMTP_CONNECTION_ERR",
      };
    }
  }

  async sendEmail({
    to,
    subject,
    message,
    cc = null,
    bcc = null,
    atttachment = null,
  }) {
    try {
      let messageBody = {
        to: to,
        from: SMTPConfig.smtpFrom,
        subject: subject,
        html: message,
        cc: cc,
        bcc: bcc,
        atttachment: atttachment,
      };
      if (cc) {
        messageBody["cc"] = cc;
      }
      if (bcc) {
        messageBody["bcc"] = bcc;
      }
      if (atttachment) {
        messageBody["atttachment"] = atttachment;
      }
      return await this.#transport.sendMail(messageBody);
    } catch (exception) {
      console.log(exception);
      throw {
        code: 500,
        message: "email cannot be sent",
        status: "EMAIL_NOT_SENT",
      };
    }
  }
}

module.exports = new EmailService();
