import express from "express";
import * as roomTypeControllers from "../controllers/roomTypeControllers"
const router = express.Router();

router.route("/").post(roomTypeControllers.add).get(roomTypeControllers.getList);

export default router;