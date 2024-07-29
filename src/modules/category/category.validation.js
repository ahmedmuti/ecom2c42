import Joi from "joi"
import { idValidation, stringValidation } from "../../utils/global.validation.js"

const addCategoryValidation = Joi.object({
    name: Joi.string().min(1).max(1000).required(),
    image: Joi.object({
        fieldname: stringValidation,
        originalname: stringValidation,
        encoding: stringValidation,
        mimetype: Joi.string().valid('image/jpeg', 'image/png', 'image/gif', 'image/jpg').required(),
        size: Joi.number().max(5242880).required(),
        destination: stringValidation,
        filename: stringValidation,
        path: stringValidation
    }).required()
})
const updateCategoryValidation = Joi.object({
    name: Joi.string().min(1).max(1000).optional(),
    image: Joi.object({
        fieldname: stringValidation,
        originalname: stringValidation,
        encoding: stringValidation,
        mimetype: Joi.string().valid('image/jpeg', 'image/png', 'image/gif', 'image/jpg').required(),
        size: Joi.number().max(5242880).required(),
        destination: stringValidation,
        filename: stringValidation,
        path: stringValidation
    }).optional(),
    id: idValidation
})
export {
    addCategoryValidation,
    updateCategoryValidation
}