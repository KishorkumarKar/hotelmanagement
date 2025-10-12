import asyncHandler from 'express-async-handler';
import * as hotelService from '../service/hotelService'

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
 * GET V1/hotel/:id
 * to get
 */
export const getById = asyncHandler(async (req, res) => {
    res.status(200).json({ success: true, message: "getById" });
});


/**
 * DELETE V1/hotel/:id
 * to delete
 */
export const deleteHotel = asyncHandler(async (req, res) => {
    res.status(200).json({ success: true, message: "delete" });
});

/**
 * PUT V1/hotel/:id
 * to update
 */
export const update = asyncHandler(async (req, res) => {
    res.status(200).json({ success: true, message: "delete" });
});