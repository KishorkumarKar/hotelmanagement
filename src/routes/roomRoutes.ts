import express from "express";
import * as roomController from "../controllers/roomControllers"
const router = express.Router();

router.post("/", roomController.add);
router.route("/").get(roomController.list);

export default router;