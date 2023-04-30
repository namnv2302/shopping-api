const mongoose = require("mongoose");
const logger = require("../../utils/logger");

const connectToDb = async () => {
  try {
    await mongoose.connect(`${process.env.DB_URL}`);
    logger.info("Connect to db success!");
  } catch (error) {
    logger.error("Connect to db failure!");
    throw new Error(error);
  }
};

module.exports = { connectToDb };
