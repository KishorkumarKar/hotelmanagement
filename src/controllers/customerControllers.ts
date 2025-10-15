import expressAsyncHandler from "express-async-handler"
import * as customerService from "../service/customerService";
import { ICustomer } from "../interface/customerInterface";

/**
 * POST /V1/customer
 * to add customer
 */
export const add = expressAsyncHandler(async (req, res) => {
    const customer: ICustomer = req.body;
    const customerObject = await customerService.add(customer);
    res.status(200).json({ success: true, message: "add", "customer": customerObject });
});

/**
 * GET /V1/customer
 * to List customer
 */
export const getList = expressAsyncHandler(async (req, res) => {
    const { limit, page } = req.headers;
    const intLimit = limit ? parseInt(limit as string) : 10
    const intPage = page ? parseInt(page as string) : 1
    const customerList = await customerService.list(intLimit, (intPage - 1) * intLimit);
    res.status(200).json(
        {
            success: true, message: "List of Customer", customer: customerList
        }
    )
});