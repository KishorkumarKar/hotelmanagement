import { Request, Response } from "express";
import { IAdminUserLogin } from "../interface/adminUserInterface";
import { validateUser } from "../service/adminUserService";


export const login = async (req: Request, res: Response) => {
    const adminLogin: IAdminUserLogin = req.body;
    const token = await validateUser(adminLogin);
    return res.status(200).json(
        {
            success: true, message: "Login", token: token
        }
    )
}