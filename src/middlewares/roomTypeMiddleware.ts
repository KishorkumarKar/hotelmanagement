import { NextFunction, Request, Response } from "express";
import * as roomTypeValidation from "../validation/roomTypeValidation";
import logger from "../util/logger";
import { AppError } from "../util/errorUtils";

export const add = (req: Request, res: Response, next: NextFunction) => {
    const roomType = req.body;
    const { error } = roomTypeValidation.add.validate(roomType);
    if (error) {
        logger.error(error);
        throw new AppError(error.details[0].message, 400);
    }
    next();
}