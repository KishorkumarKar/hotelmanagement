import { ICustomer } from "../interface/customerInterface";
import CustomerModel from "../models/customerModel";

/**
 * To add RoomType
 * @param customerData 
 * @returns 
 */
export const add = (customerData: ICustomer) => {
    const customer = new CustomerModel(customerData);
    return customer.save();
}


/**
 * To list customer
 * @param limit 
 * @param skip 
 * @returns 
 */
export const list = (limit: number, skip: number) => {
    return CustomerModel.find()
        .limit(limit)
        .skip(skip)
        .sort({ createdAt: -1 });
}

/**
 * Get Customer By id
 * @param id 
 * @returns 
 */
export const getById = (id: string) => {
    return CustomerModel.findById(id);
}