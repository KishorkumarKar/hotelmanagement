import { NextFunction, Request, Response } from "express";
import { AppError } from "../util/errorUtils";
import { verifyToken } from "../util/manage.passwordUtils";

export const adminLogin = async (req: Request, res: Response, next: NextFunction) => {
    return next();
}

export const isValidAdminUser = async (req: Request, res: Response, next: NextFunction) => {

    const token: string | undefined = req.headers["authorization"]?.split(" ")[1];
    if (!token) {
        return next(AppError.loginValidation("No token provided"));
    }
    try {
        const validToken = await verifyToken(token);
        req.headers["admin"] = JSON.stringify(validToken);
        return next();
    } catch (error: unknown) {
        if (error instanceof Error) {
            return next(AppError.loginValidation(error.message));
        } else {
            return next(AppError.loginValidation("Invalid Token"));
        }
    }
}