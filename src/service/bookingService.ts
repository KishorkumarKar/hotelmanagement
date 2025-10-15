import { IBooking } from "../interface/bookingInterface";
import BookingModel from "../models/bookingModel";

/**
 * To add Booking
 * @param bookingData 
 * @returns 
 */
export const add = (bookingData: IBooking) => {
    const booking = new BookingModel(bookingData);
    return booking.save();
}


/**
 * To list Booking
 * @param limit 
 * @param skip 
 * @returns 
 */
export const list = (limit: number, skip: number) => {
    return BookingModel.find()
        .limit(limit)
        .skip(skip)
        .sort({ createdAt: -1 });
}
