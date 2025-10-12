import { Application } from "express";
import config from "../config";
import hotel from "../routes/hotelRoutes";
const version="/"+config.version;

const route=config.route;
const routeManagement = (app: Application) => {
    app.use(version+"/"+route.hotel, hotel);
};
export default routeManagement;
