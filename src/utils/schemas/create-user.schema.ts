import * as Joi from 'joi';

export const createUserSchema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
    name: Joi.string().required(),
    address: Joi.string().required(),
    cityId: Joi.number().positive().required()
})