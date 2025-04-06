import Joi from "joi";

export const signupSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required().pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/)
})

export const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
})