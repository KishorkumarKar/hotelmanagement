import express from "express";
import * as bookingControllers from "../controllers/bookingControllers"
import * as bookingMiddleware from "../middlewares/bookingMiddleware";
const router = express.Router();

router.route("/").post(bookingMiddleware.book, bookingControllers.add).get(bookingControllers.getList);

export default router;