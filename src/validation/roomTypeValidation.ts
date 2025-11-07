import Joi from "joi";

export const add=Joi.object({
    type_name:Joi.string().required(),
    description:Joi.string().allow("").optional(),
    max_occupation:Joi.number().required(),
});