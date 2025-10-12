import express from "express";
import dotenv from "dotenv";
const env = dotenv.config();
import config from "./config";
import logger from "./util/logger";
const app = express();


const collectServer = async () => {
    try {
        app
            .listen(config.port, () => {
                logger.info(`Express is listening at http://localhost:${config.port}`);
            })
            .on("error", (err) => {
                logger.info(`Error on serve listening ${err}`);
            });
    } catch (error) {
        console.error("server Error:- " + error);
    }
};
collectServer();


//unhandled promise rejection
process.on("unhandledRejection", (reason, promise) => {
    logger.error("Unhandled Rejection at", promise, "reason:", reason);
});

