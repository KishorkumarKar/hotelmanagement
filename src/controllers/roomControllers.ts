import expressAsyncHandler from "express-async-handler"
import { IRoom } from "../interface/roomInterface"
import * as roomService from "../service/roomService";

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