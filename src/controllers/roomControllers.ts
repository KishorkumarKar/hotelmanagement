import expressAsyncHandler from "express-async-handler"
import { IRoom, IRoomAvailable } from "../interface/roomInterface"
import * as roomService from "../service/roomService";
import * as bookingService from "../service/bookingService";

/**
 * POST V1/room
 * to add room
 */
export const add = expressAsyncHandler(async (req, res) => {
    const room: IRoom = req.body;
    const roomObject = await roomService.add(room);
    res.status(200).json(
        {
            success: true, message: "added", room: roomObject
        }
    )
})

export const roomAvailable = expressAsyncHandler(async (req, res) => {
    const roomAvailableFilter: IRoomAvailable = req.body;
    const roomObject = await bookingService.getBookedRoomNumber(
        bookingService.checkInCheckOutConvert(roomAvailableFilter.check_in.toString(), "check_in"),
        bookingService.checkInCheckOutConvert(roomAvailableFilter.check_out.toString()),
        roomAvailableFilter.hotel_id);
    const roomAvailable = await roomService.getAvailableRoomForBooking(roomAvailableFilter.room_type, roomAvailableFilter.hotel_id, roomObject);
    res.status(200).json(
        {
            success: true, message: "List of expressAsyncHandler", room_not_available: roomObject, roomAvailable: roomAvailable
        }
    );
})

/**
 * POST V1/room
 * to add room
 */
export const list = expressAsyncHandler(async (req, res) => {
    const { limit, page } = req.headers;
    const intLimit = limit ? parseInt(limit as string) : 10
    const intPage = page ? parseInt(page as string) : 1
    const roomList = await roomService.list(intLimit, (intPage - 1) * intLimit);
    res.status(200).json(
        {
            success: true, message: "List of rooms", rooms: roomList
        }
    )
})