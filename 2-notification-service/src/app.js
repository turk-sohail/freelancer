const express = require("express");
const app = express();
const healthRoutes = require("./routes/health-routes");
const port = 4001;
const serverConfig = require("./config/server-config");
const { checkConnection, logger } = require("./config/elastic");
const { createConnection } = require("./queues/connection");
const {
  consumeAuthEmailMessages,
  consumeOrderEmailMessages,
} = require("./queues/email-consumer");
app.set("view engine", "ejs");

function start() {
  Promise.all([startElasticSearch(), startQueues()]);

  app.use("/", healthRoutes);

  app.listen(port, () => {
    logger.info(`Notification service started on port ${port}`);
  });
}

async function startQueues() {
  const channel = await createConnection();
  await consumeAuthEmailMessages(channel);
  await consumeOrderEmailMessages(channel);
  await channel.assertExchange("jobber-email-notification", "direct");
  await channel.assertExchange("order-email-notification", "direct");
  const message = JSON.stringify({
    message: "Hello world",
    service: "Notification service",
  });

  const message2 = JSON.stringify({
    message: "Hello khan",
    service: "Notification service order arrived",
  });

  channel.publish(
    "jobber-email-notification",
    "auth-email",
    Buffer.from(message)
  );

  channel.publish(
    "order-email-notification",
    "order-email",
    Buffer.from(message2)
  );
}
function startElasticSearch() {
  checkConnection();
}

module.exports.start = start;
