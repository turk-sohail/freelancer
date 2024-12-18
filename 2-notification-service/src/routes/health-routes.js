const { StatusCodes } = require("http-status-codes");

const router = require("express").Router();

router.get("/health", (req, res) => {
  res.status(StatusCodes.OK).send("Notification service is healthy");
});

module.exports = router;
