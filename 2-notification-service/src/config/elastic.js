const elasticsearch = require("@elastic/elasticsearch");
const winston = require("winston");
const { ElasticsearchTransport } = require("winston-elasticsearch");
const serverConfig = require("./server-config");

// Elasticsearch client setup
const esClient = new elasticsearch.Client({
  node: serverConfig.ELASTIC_SEARCH_URL, // Replace with your Elasticsearch URL
  // If using authentication:
  // auth: {
  //   username: 'your-username',
  //   password: 'your-password',
  // },
  tls: {
    rejectUnauthorized: false,
  },
});
const checkConnection = async () => {
  try {
    await esClient.ping();
    console.log("Connected to elastic search successfully");
    logger.info("Connected to elastic search successfully");
  } catch (error) {
    console.error(`Error connecting to elastic search: ${error.message}`);
    logger.error(`Error connecting to elastic search: ${error.message}`);
  }
};
// Configure the Elasticsearch transport for Winston
const esTransportOpts = {
  level: "info", // Set the minimum log level
  client: esClient, // Pass the Elasticsearch client to the transport
  indexPrefix: "logs", // Set the index prefix, which will be used for index names (e.g., logs-YYYY-MM-DD)
  transformer: (log) => {
    return {
      "@timestamp": new Date().toISOString(),
      message: log.message,
      level: log.level,
      ...log,
    };
  },
};

// Create a Winston logger
const logger = winston.createLogger({
  level: "info",
  transports: [
    new winston.transports.Console(), // Log to console
    new ElasticsearchTransport(esTransportOpts), // Log to Elasticsearch
  ],
});

module.exports = { checkConnection, logger };
