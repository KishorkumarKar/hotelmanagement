import express from "express";
import dotenv from "dotenv";
const env = dotenv.config();
import config from "./config";
import mongoose from "./config/mongooseConfig";
import logger from "./util/logger";
import indexRoute from "./routes/indexRoutes";
import errorHandlerMiddleware from "./middlewares/errorHandlerMiddleware";
import { consumeBookEmail } from "./service/BookingEmailService";
import { ensureAdminUser } from "./util/validateAdminUserUtils";
const app = express();

//---------deb Connect-------
mongoose();
//---------deb Connect-------
//---------middleware-------
app.use(express.json());
//---------middleware-------
//---------Route-------
indexRoute(app);
//---------Route-------
//---------consumer-------
consumeBookEmail();
//---------consumer-------
//---------error handler-------
app.use(errorHandlerMiddleware);
//---------error handler-------
//----create Admin user----------
ensureAdminUser()
//----create Admin user----------

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

