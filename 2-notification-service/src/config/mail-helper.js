const { logger } = require("./elastic");
const nodemailer = require("nodemailer");
const serverConfig = require("./server-config");
const Email = require("email-templates");
const path = require("path");

async function emailTemplates(template, receiver, locals) {
  try {
    const email = new Email({
      message: {
        from: serverConfig.SENDER_EMAIL,
      },
      transport,
    });

    await email.send({
      message: "shit",
    });
  } catch (error) {
    logger.error(`Error sending email: ${error.message}`);
  }
}

module.exports = { emailTemplates };
