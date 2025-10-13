import { IRoom } from "../interface/roomInterface";
import Room from "../models/roomModel"

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