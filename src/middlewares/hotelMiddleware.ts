import { NextFunction, Request, Response } from "express";
import * as hotelValidation from "../validation/hotelValidation";
import logger from "../util/logger";
import { AppError } from "../util/errorUtils";
export const add = async (req: Request, res: Response, next: NextFunction) => {
  const classRoom = req.body;
  const { error } = hotelValidation.add.validate(classRoom);
  if (error) {
    logger.error(error);
    throw new AppError(error.details[0].message, 400);
  }
  return next();
}