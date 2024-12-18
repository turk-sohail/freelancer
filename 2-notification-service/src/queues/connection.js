const { logger } = require("../config/elastic");
const serverConfig = require("../config/server-config");
const client = require("amqplib");
let channel;
async function createConnection() {
  try {
    const connection = await client.connect(serverConfig.RABBITMQ_ENDPOINT);
    channel = await connection.createChannel();
    logger.info("Connected to RabbitMQ successfully");
    return channel;
    closeConnection(channel, connection);
  } catch (error) {
    logger.error(`Error connecting to RabbitMQ: ${error.message}`);
  }
}

function closeConnection(channel, connection) {
  process.on("SIGINT", async () => {
    await channel.close();
    await connection.close();
  });
}

module.exports = { createConnection, channel };
