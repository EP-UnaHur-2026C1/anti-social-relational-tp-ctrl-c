const BaseJoi = require('joi')
const JoiDate = require('@joi/date')
const Joi = BaseJoi.extend(JoiDate)

const createPostSchema  = Joi.object({
    texto: Joi.string()
        .required()
        .min(1)
        .max(500)
        .messages({
            "any.required" :"texto es requerido",
            "string.base" : "El texto debe ser una cadena de texto",
            "string.empty": "El texto no puede estar vacio",
            "string.min" : "El texto del post debe tener como mínimo {#limit} caracter",
            "string.max" : "El texto del post debe tener como máximo {#limit} caracteres"
    }),

})

const updatePostSchema = Joi.object({
    texto: Joi.string()
        .trim()
        .min(1)
        .max(500)
        .optional()
        .messages({
            "any.required" :"texto es requerido",
            "string.base" : "El texto debe ser una cadena de texto",
            "string.empty": "El texto no puede estar vacio",
            "string.min" : "El texto del post debe tener como mínimo {#limit} caracter",
            "string.max" : "El texto del post debe tener como máximo {#limit} caracteres"
        })
})

module.exports = {
    createPostSchema,
    updatePostSchema
}