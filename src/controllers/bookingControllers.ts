import expressAsyncHandler from "express-async-handler"
import * as bookingService from "../service/bookingService";
import { IBooking, IBookingProcess } from "../interface/bookingInterface";

/**
 * POST /V1/booking
 * to add booking
 */
export const add = expressAsyncHandler(async (req, res) => {
    const booking: IBookingProcess = req.body;
    const bookingObject = await bookingService.manageBooking(booking);
    res.status(200).json({ success: true, message: "add",book:bookingObject});
});

/**
 * GET /V1/booking
 * to List booking
 */
export const getList = expressAsyncHandler(async (req, res) => {
    const { limit, page } = req.headers;
    const intLimit = limit ? parseInt(limit as string) : 10
    const intPage = page ? parseInt(page as string) : 1
    const bookingList = await bookingService.list(intLimit, (intPage - 1) * intLimit);
    res.status(200).json(
        {
            success: true, message: "List of booking", booking: bookingList
        }
    )
});