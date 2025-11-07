import Joi from "joi";
import mongoose from "mongoose";

export const book = Joi.object({
    customer_id: Joi.string()
        .custom((value, helpers) => {
            if (!mongoose.Types.ObjectId.isValid(value)) {
                return helpers.error("customer_id.invalid");
            }
            return value;
        })
        .required()
        .messages({
            "customer_id.invalid": "customer_id must be a valid ObjectId",
        }),
    payment_method: Joi.string().required(),
    hotel_code: Joi.string().required(),
    check_in: Joi.date().required(),
    check_out: Joi.date().required(),
    room_type: Joi.string().required(),
});