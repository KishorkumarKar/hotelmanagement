import asyncHandler from 'express-async-handler';
import * as hotelService from '../service/hotelService'
import { AppError } from '../util/errorUtils';
import HotelEvents from "../events/hotelEvents";

/**
 * POST V1/hotel
 * to add
 */
export const add = asyncHandler(async (req, res) => {
    const hotel = req.body;
    const hotelObject = await hotelService.add(hotel);
    res.status(200).json({ success: true, message: "add", hotel: hotelObject });
});


/**
 * GET V1/hotel
 * to get
 */
export const getList = asyncHandler(async (req, res) => {
    const { limit, page } = req.headers;
    const pageInt = page ? parseInt(page as string) : 1;
    const limitInt = limit ? parseInt(limit as string) : 10;
    const hotelList = await hotelService.list(limitInt, (pageInt - 1) * limitInt);
    console.log(limit, page)
    res.status(200).json({ success: true, message: "List", hotels: hotelList });
});

/**
 * GET V1/hotel/:id
 * to get
 */
export const getById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const hotel = await hotelService.getById(id);
    res.status(200).json({ success: true, message: "getById", hotel: hotel });
});


/**
 * DELETE V1/hotel/:id
 * to delete
 */
export const deleteHotel = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const hotel = await hotelService.getById(id);
    if (!hotel) {
        throw AppError.notFound(`Hotel Doesn't exist`);
    } else {
        HotelEvents.emitEvent("hotelDeletedIdCreated", {
            id: id,
            name: hotel.name,
        });
        hotelService.deleteById(id);
        res.status(200).json({ success: true, message: `Deleted Hotel ${hotel.name}` });
    }
});

/**
 * PUT V1/hotel/:id
 * to update
 */
export const update = asyncHandler(async (req, res) => {
    res.status(200).json({ success: true, message: "delete" });
});