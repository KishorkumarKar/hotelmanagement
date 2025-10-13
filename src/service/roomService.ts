import { IRoom } from "../interface/roomInterface";
import Room from "../models/roomModel"
import HotelEvents from "../events/hotelEvents";
import logger from "../util/logger";

/**
 * To add
 * @param roomObject 
 * @returns 
 */
export const add = (roomObject: IRoom) => {
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