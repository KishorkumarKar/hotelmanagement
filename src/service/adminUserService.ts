import { IAdminUser } from "../interface/adminUserInterface";
import AdminUser from "../models/adminUserModel";

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
    const totalCount =await AdminUser.countDocuments();
    if(totalCount>0){
        return true;
    }else{
        return false
    }
}