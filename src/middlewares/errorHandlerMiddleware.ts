import { Request, Response, NextFunction } from "express";
import { AppError } from "../util/errorUtils";

export default async (
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const status = err.statusCode || 500;
  const message = err.message || "Internal Error";
  return res.status(status).json({
    success: false,
    message: message,
  });
};
