import { IRoomType } from "../interface/roomTypeInterface";
import RoomType from "../models/roomTypeModel";

/**
 * To add RoomType
 * @param roomTypeData 
 * @returns 
 */
export const add = (roomTypeData: IRoomType) => {
    const roomType = new RoomType(roomTypeData);
    return roomType.save();
}


/**
 * To list roomType
 * @param limit 
 * @param skip 
 * @returns 
 */
export const list = (limit: number, skip: number) => {
    return RoomType.find()
        .limit(limit)
        .skip(skip)
        .sort({ createdAt: -1 });
}
