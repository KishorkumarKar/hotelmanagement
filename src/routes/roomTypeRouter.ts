import express from "express";
import * as roomTypeControllers from "../controllers/roomTypeControllers"
import * as roomTypeMiddleware from "../middlewares/roomTypeMiddleware"
const router = express.Router();

router.route("/").post(roomTypeMiddleware.add, roomTypeControllers.add).get(roomTypeControllers.getList);

export default router;