import { NextFunction, Request, Response } from "express";
import * as bookingValidation from "../validation/bookingValidation";
import logger from "../util/logger";
import { AppError } from "../util/errorUtils";
export const book = async (req: Request, res: Response, next: NextFunction) => {
    const body = req.body;
    const { error } = bookingValidation.book.validate(body);
    if (error) {
        logger.error(error);
        throw new AppError(error.details[0].message, 400);
    }

    next();
}