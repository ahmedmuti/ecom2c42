import Joi from "joi";



export const idValidation = Joi.string().hex().length(24).required()
export const stringValidation = Joi.string().required()