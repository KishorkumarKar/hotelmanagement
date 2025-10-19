import { IRoom } from "../interface/roomInterface";
import Room from "../models/roomModel"
import HotelEvents from "../events/hotelEvents";
import logger from "../util/logger";
import * as roomTypeService from "./roomTypeService";
import * as hotelService from "./hotelService";
import { AppError } from "../util/errorUtils";

/**
 * To add
 * @param roomObject 
 * @returns 
 */
export const add = async (roomObject: IRoom) => {
    const roomType = await roomTypeService.getById(roomObject.room_type_id.toString());
    if (!roomType) {
        throw AppError.notFound(`Invalid room Type ${roomObject.room_type_id}`);
    }
    const hotel = await hotelService.getById(roomObject.hotel_id.toString());
    if (!hotel) {
        throw AppError.notFound(`Invalid hotel ${roomObject.hotel_id}`);
    }
    roomObject.room_type = roomType.type_name;
    const room = new Room(roomObject);
    return room.save();
}


/**
 * Tp get list of room
 * @param roomObject 
 * @returns 
 */
export const list = (limit: number, skip: number) => {
    return Room.find()
        .limit(limit)
        .skip(skip)
        .sort({ createdAt: -1 });
}

/**
 * To get Room by Number
 * @param id 
 * @returns 
 */
export const getRoomByNumber = (room_number: string, hotel_id: string) => {
    return Room.findOne({
        $and: [{ room_number: room_number }, { hotel_id: hotel_id }]
    });
}

/**
 * To get Room for booking
 * @param id 
 * @returns 
 */
export const getAvailableRoomForBooking = async (type: string | undefined, hotel_id: string, bookedRoomIds: any) => {
    let andFilter: Array<{}> = [{ hotel_id: hotel_id }];
    if (type) {
        andFilter.push({ room_type: type });
    }
    let filter = {
        room_number: { $nin: bookedRoomIds },
        $and: andFilter
    };
    return Room.find(filter);
}

/**
 * To get Room for booking
 * @param id 
 * @returns 
 */
export const getAvailableRoom = async (checkIn: Date, checkOut: Date, hotelId: string, type: string = "", bookedRoomIds: Array<string>) => {
    return Room.find({
        room_number: { $nin: bookedRoomIds },
        $and: [{ room_type: type }, { hotel_id: hotelId }]
    });
}

// events emit on deleting hotel
HotelEvents.onEvent("hotelDeletedIdCreated", (msg) => {
    const { id } = msg;
    logger.info("📢 Hotel service heard myEvent ....:", msg);
    deleteRoomByHotelId(id);
});

/**
 * To delete rooms when hotel is deleted
 * @param hotelId 
 */
const deleteRoomByHotelId = async (hotelId: string) => {
    const isHotelDeleted = await Room.deleteMany({ hotel_id: hotelId });
    logger.info("Rooms deleted of hotel " + hotelId, isHotelDeleted);
}