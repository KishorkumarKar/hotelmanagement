import { IBooking, IBookingProcess } from "../interface/bookingInterface";
import BookingModel from "../models/bookingModel";
import * as customerService from "./customerService";
import * as roomService from "./roomService";
import * as hotelService from "./hotelService";
import { AppError } from "../util/errorUtils";
import logger from "../util/logger";
import { IRoomType } from "../interface/roomTypeInterface";
import config from "../config";
import { IRoom } from "../interface/roomInterface";

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

/**
 * Add booking information
 * @param bookingData 
 */
export const manageBooking = async (bookingData: IBookingProcess) => {

    let errorMessage = null;
    let bookInstance: IBooking = {} as IBooking;
    if (JSON.stringify(bookInstance) !== "{}") {
        console.log("--");
    }
    //-----------validate customer-------
    const customer = await customerService.getById(bookingData.customer_id);
    if (!customer) {
        errorMessage = `In valid customer ${bookingData.customer_id}`;
        logger.error(errorMessage);
        throw AppError.notFound(errorMessage);
    } else {
        bookInstance.customer = {
            customer_id: customer.id,
            address: customer.address,
            email: customer.email,
            first_name: customer.first_name,
            id_number: customer.id_number,
            id_type: customer.id_type,
            last_name: customer.last_name,
            phone: customer.phone
        }
    }
    //-----------validate customer-------
    //------------Validate hotel -------------
    const hotel = await hotelService.getHotelByCode(bookingData.hotel_code)
    if (!hotel) {
        errorMessage = `In valid Hotel ${bookingData.hotel_code}`;
        logger.error(errorMessage);
        throw AppError.notFound(errorMessage);
    } else {
        //------------Validate room -------------
        let checkIn = new Date(bookingData.check_in);
        let checkOut = new Date(bookingData.check_out);

        const timeDiff = checkOut.getTime() - checkIn.getTime(); // in milliseconds
        const numberOfDays = timeDiff / (1000 * 60 * 60 * 24); // convert to days
        checkIn = new Date(checkIn.getTime() + (config.check_in_time as number) * 60 * 60 * 1000);
        checkOut = new Date(checkOut.getTime() + (config.check_out_time as number) * 60 * 60 * 1000);


        const bookRoomOnThatRange = await getBookedRoomNumber(checkIn, checkOut, hotel.id);
        console.log("-bookRoomOnThatRange-", bookRoomOnThatRange, checkIn, checkOut)
        const roomAvailable = await roomService.getAvailableRoom(bookingData.room_type, hotel.id, bookRoomOnThatRange);
        if (!roomAvailable || roomAvailable.length <= 0) {
            errorMessage = `No Rooms Available on between  ${bookingData.check_in} - ${bookingData.check_out}`;
            logger.error(errorMessage);
            throw AppError.notFound(errorMessage);
        }
        console.log("-roomAvailable-", roomAvailable[0])
        // console.log("-----room A--",roomAvailable)
        const room = roomAvailable[0];
        let paidAmount: number = 0;
        if (!room) {
            errorMessage = `In valid Room ${bookingData.room_type}`;
            logger.error(errorMessage);
            throw AppError.notFound(errorMessage);
        } else {
            const roomType = await room.populate<{ room_type_id: IRoomType }>("room_type_id");
            bookInstance.room_id = room.id;
            bookInstance.room_number = room.room_number;
            bookInstance.room_type = roomType.room_type_id.type_name;
            paidAmount = room.price_per_night * numberOfDays;
        }
        //------------Validate room -------------
        bookInstance.check_in = checkIn;
        bookInstance.check_out = checkOut;
        bookInstance.hotel_id = hotel.id;
        bookInstance.hotel_code = hotel.code;
        bookInstance.payment = {
            payment_date: new Date(),
            payment_method: "cash",
            payment_status: "paid",
            amount_paid: paidAmount
        }
        return await add(bookInstance);
    }
    //------------Validate room -------------
}

/**
 * Get list of room booked for specific hotel on given
 * time range
 * @param checkIn 
 * @param checkOut 
 * @param hotelId 
 * @param status 
 * @returns 
 */
export const getBookedRoomNumber = async (checkIn: Date, checkOut: Date, hotelId: string, status: number = 1) => {
    const bookedRoomObject = await BookingModel.find({
        hotel_id: hotelId,
        status: status,
        $and: [{ check_in: { $gte: checkIn } }, { check_out: { $lte: checkOut } }]
    }).select(["room_number"]);
    let bookedRoom: Array<string> = [];
    if (bookedRoomObject) {
        bookedRoom = bookedRoomObject.map(room => room.room_number);
    }
    return bookedRoom;
}
