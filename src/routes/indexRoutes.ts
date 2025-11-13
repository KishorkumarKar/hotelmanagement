import { Application } from "express";
import config from "../config";
import hotel from "../routes/hotelRoutes";
import room from "../routes/roomRoutes";
import roomType from "./roomTypeRouter";
import customerRoute from "./customerRoute";
import bookingRoutes from "./bookingRoutes";
import adminUser from "./adminUser";
import { isValidAdminUser } from "../middlewares/adminUserMiddleware";
const version = "/" + config.version;

const route = config.route;
const routeManagement = (app: Application) => {
    app.use(isValidAdminUser);
    app.use(version + "/" + route.hotel, hotel);
    app.use(version + "/" + route.room, room);
    app.use(version + "/" + route.roomType, roomType);
    app.use(version + "/" + route.customer, customerRoute);
    app.use(version + "/" + route.book, bookingRoutes);
    app.use(version + "/" + route.loginAdmin, adminUser);
};
export default routeManagement;
