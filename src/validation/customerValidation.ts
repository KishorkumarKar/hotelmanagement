import Joi from "joi";
export const add = Joi.object({
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
    age: Joi.number().required(),
    email: Joi.string().email().required(),
    phone: Joi.string().required(),
    address: Joi.string().required(),
    id_type: Joi.string().required(),
    id_number: Joi.string().required(),
});