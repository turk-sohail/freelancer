const { logger } = require("./elastic");
const { emailTemplates } = require("./mail-helper");
const serverConfig = require("./server-config");
const nodemailer = require("nodemailer");
async function sendEmail() {
  try {
    const transport = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      auth: {
        user: serverConfig.SENDER_EMAIL,
        pass: serverConfig.SENDER_EMAIL_PASSWORD,
      },
    });

    const sendEmail = await transport.sendMail({
      from: `Maddison Foo Koch 👻${serverConfig.CLIENT_URL}`, // sender address
      to: `${serverConfig.SENDER_EMAIL}`, // list of receivers
      subject: "Hello ✔", // Subject line
      text: "Hello khan?", // plain text body
      html: "<b>Your order is ready?</b>", // html body
    });
    logger.info("Email sent successfully");
  } catch (error) {
    logger.error(`Error sending email: ${error.message}`);
  }
}

module.exports = { sendEmail };
