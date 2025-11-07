import Joi from "joi";

export const add = Joi.object({
  name: Joi.string().required(),
  code: Joi.string().required(),
  email: Joi.string().email().required(),
  street: Joi.string().required(),
  pin: Joi.string().required(),
  city: Joi.string().required(),
  state: Joi.string().required(),
  country: Joi.string().required(),
  phone: Joi.string().required(),
  rating: Joi.number().required().min(1).max(5),
});
