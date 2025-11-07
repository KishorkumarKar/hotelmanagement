import express from "express";
import * as roomController from "../controllers/roomControllers"
import * as roomMiddleware from "../middlewares/roomMiddleware"
const router = express.Router();

router.post("/", roomMiddleware.add, roomController.add);
router.post("/available", roomMiddleware.roomAvailable, roomController.roomAvailable);
router.route("/").get(roomController.list);

export default router;