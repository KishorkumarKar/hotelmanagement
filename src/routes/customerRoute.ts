import express from "express";
import * as customerControllers from "../controllers/customerControllers"
import * as customerMiddleware from "../middlewares/customerMiddleware";
const router = express.Router();

router.route("/").post(customerMiddleware.add, customerControllers.add).get(customerControllers.getList);

export default router;