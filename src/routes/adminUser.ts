import express from "express";
import * as adminUserController from "../controllers/adminUserController"
import * as adminUserMiddleware from "../middlewares/adminUserMiddleware";
const router = express.Router();

router.route("/").post(adminUserMiddleware.adminLogin, adminUserController.login);

export default router;