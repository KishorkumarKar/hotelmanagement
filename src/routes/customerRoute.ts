import express from "express";
import * as customerControllers from "../controllers/customerControllers"
const router = express.Router();

router.route("/").post(customerControllers.add).get(customerControllers.getList);

export default router;