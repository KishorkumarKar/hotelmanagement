import express from "express";
import * as bookingControllers from "../controllers/bookingControllers"
const router = express.Router();

router.route("/").post(bookingControllers.add).get(bookingControllers.getList);

export default router;