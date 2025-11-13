import { IAdminUser, IAdminUserLogin } from "../interface/adminUserInterface";
import AdminUser from "../models/adminUserModel";
import { AppError } from "../util/errorUtils";
import * as managePasswordUtils from "../util/manage.passwordUtils"

/**
 * To get Admin user by user
 * @param user 
 * @returns 
 */
export const getByUser = (user: string) => {
    return AdminUser.findOne({ user: user });
}

/**
 * To save Admin user
 * @param adminUser 
 * @returns 
 */
export const add = (adminUser: IAdminUser) => {
    const adminUserObject = new AdminUser(adminUser);
    return adminUserObject.save();
}

/**
 * to check any user exist
 * @returns boolean
 */
export const isAnyUserExist = async () => {
    const totalCount = await AdminUser.countDocuments();
    if (totalCount > 0) {
        return true;
    } else {
        return false
    }
}

export const validateUser = async (loginData: IAdminUserLogin) => {
    const adminUser = await getByUser(loginData.user);
    let token = null;
    if (adminUser) {
        const isValidUser = managePasswordUtils.comparePassword(loginData.password, adminUser.password);
        if (isValidUser) {
            token = managePasswordUtils.getWebToken(adminUser, "admin");
        } else {
            throw AppError.loginValidation("In valid password");
        }
    } else {
        throw AppError.loginValidation("Is not a valid user");
    }
    return token;
}