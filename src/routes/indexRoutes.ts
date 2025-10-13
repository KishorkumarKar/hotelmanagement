import { Application } from "express";
import config from "../config";
import hotel from "../routes/hotelRoutes";
import room from "../routes/roomRoutes";
const version="/"+config.version;

const route=config.route;
const routeManagement = (app: Application) => {
    app.use(version+"/"+route.hotel, hotel);
    app.use(version+"/"+route.room, room);
};
export default routeManagement;
