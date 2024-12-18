const { logger } = require("../config/elastic");
const { sendEmail } = require("../config/mail-transport");
const serverConfig = require("../config/server-config");
const { createConnection } = require("./connection");

let consumeAuthEmailMessages = async (channel) => {
  try {
    if (!channel) {
      channel = await createConnection();
    }
    const exchangeName = "jobber-email-notification";
    const routingKey = "auth-email";
    const queueName = "auth-email-queue";

    await channel.assertExchange(exchangeName, "direct", { durable: true });
    const joberQueue = await channel.assertQueue(queueName, { durable: true });
    await channel.bindQueue(joberQueue.queue, exchangeName, routingKey);

    await channel.consume(queueName, async (message) => {
      if (message) {
        const { content } = message;

        const data = JSON.parse(content);
        sendEmail();
        await channel.ack(message);
      }
    });
  } catch (error) {
    logger.error(`Error consuming auth email messages: ${error.message}`);
  }
};

let consumeOrderEmailMessages = async (channel) => {
  try {
    if (!channel) {
      channel = await createConnection();
    }
    const exchangeName = "order-email-notification";
    const routingKey = "order-email";
    const queueName = "order-email-queue";

    await channel.assertExchange(exchangeName, "direct", { durable: true });
    const joberQueue = await channel.assertQueue(queueName, { durable: true });
    await channel.bindQueue(joberQueue.queue, exchangeName, routingKey);

    await channel.consume(queueName, async (message) => {
      if (message) {
        const { content } = message;

        const data = JSON.parse(content);
        //send order emails
        console.log(data);
        await channel.ack(message);
      }
    });
  } catch (error) {
    logger.error(`Error consuming order email messages: ${error.message}`);
  }
};

module.exports = { consumeAuthEmailMessages, consumeOrderEmailMessages };
