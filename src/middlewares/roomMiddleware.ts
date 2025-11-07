import { NextFunction, Request, Response } from "express";
import * as roomValidation from "../validation/roomValidation";
import logger from "../util/logger";
import { AppError } from "../util/errorUtils";

export const add = async (req: Request, res: Response, next: NextFunction) => {
    const body = req.body;
    const { error } = roomValidation.add.validate(body);
    if (error) {
        logger.error(error);
        throw new AppError(error.details[0].message, 400);
    }
    next();
}


export const roomAvailable = async (req: Request, res: Response, next: NextFunction) => {
    const body = req.body;
    const { error } = roomValidation.roomAvailable.validate(body);
    if (error) {
        logger.error(error);
        throw new AppError(error.details[0].message, 400);
    }
    next();
}