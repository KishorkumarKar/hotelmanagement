import expressAsyncHandler from "express-async-handler"
import { IRoomType } from "../interface/roomTypeInterface";
import * as roomTypeService from "../service/roomTypeService";

/**
 * POST /V1/roomtype
 * to add room type
 */
export const add = expressAsyncHandler(async (req, res) => {
    const roomType: IRoomType = req.body;
    const roomTypeObject = await roomTypeService.add(roomType);
    res.status(200).json({ success: true, message: "add", "room_type": roomTypeObject });
});

/**
 * GET /V1/roomtype
 * to get all room type
 */
export const getList = expressAsyncHandler(async (req, res) => {
    const { limit, page } = req.headers;
    const intLimit = limit ? parseInt(limit as string) : 10
    const intPage = page ? parseInt(page as string) : 1
    const roomList = await roomTypeService.list(intLimit, (intPage - 1) * intLimit);
    res.status(200).json(
        {
            success: true, message: "List of roomsType", rooms: roomList
        }
    )
});