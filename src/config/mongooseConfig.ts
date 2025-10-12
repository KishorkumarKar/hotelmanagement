
import mongoose from "mongoose";
import logger from "../util/logger";
import config from ".";
// const mongoose = require("mongoose");
// const logger = require("../util/logger");
// const config = require("../config");

const connectDB = async () => {
  mongoose
    .connect(config.db_connection as string)
    .then(() => logger.info("MongoDB connected" + config.db_connection))
    .catch((err) => logger.error("MongoDB connection error:", err));
};

export default connectDB;
