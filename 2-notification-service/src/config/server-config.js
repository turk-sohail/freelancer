const dotenv = require("dotenv");
dotenv.config();

const serverConfig = {
  port: process.env.PORT,
  NODE_ENV: process.env,
  CLIENT_URL: process.env.CLIENT_URL,
  RABBITMQ_ENDPOINT: process.env.RABBITMQ_ENDPOINT,
  SENDER_EMAIL_PASSWORD: process.env.SENDER_EMAIL_PASSWORD,
  ELASTIC_SEARCH_URL: process.env.ELASTIC_SEARCH_URL,
  ELASTIC_APM_SERVER_URL: process.env.ELASTIC_APM_SERVER_URL,
  ELASTIC_APM_SECRET_TOKEN: process.env.ELASTIC_APM_SECRET_TOKEN,
  SENDER_EMAIL: process.env.SENDER_EMAIL,
};

module.exports = serverConfig;
