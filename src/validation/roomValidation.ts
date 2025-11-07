import Joi from "joi";
import mongoose from "mongoose";

export const add = Joi.object({
    hotel_id: Joi.string()
        .custom((value, helpers) => {
            if (!mongoose.Types.ObjectId.isValid(value)) {
                return helpers.error("hotel_id.invalid");
            }
            return value;
        })
        .required()
        .messages({
            "hotel_id.invalid": "hotel_id must be a valid ObjectId",
        }),
    room_type_id: Joi.string()
        .custom((value, helpers) => {
            if (!mongoose.Types.ObjectId.isValid(value)) {
                return helpers.error("room_type_id.invalid");
            }
            return value;
        })
        .required()
        .messages({
            "room_type_id.invalid": "room_type_id must be a valid ObjectId",
        }),
    room_number: Joi.string().pattern(/^ROOM [a-zA-Z0-9]+$/).required().messages({
        "string.pattern.base": 'room_number must start with "ROOM " (e.g. "ROOM 204, ROOM A204")'
    }),
    floor: Joi.number().required(),
    status: Joi.number().required().min(0).max(2),
    price_per_night: Joi.number().required(),
});

export const roomAvailable = Joi.object({
    room_type: Joi.string().allow("").optional(),
    hotel_id: Joi.string().custom((value, helpers) => {
        if (!mongoose.Types.ObjectId.isValid(value)) {
            return helpers.error("hotel_id.invalid");
        }
        return value;
    })
        .required()
        .messages({
            "hotel_id.invalid": "hotel_id must be a valid ObjectId",
        }),
    check_in: Joi.date().required(),
    check_out: Joi.date().required()
});