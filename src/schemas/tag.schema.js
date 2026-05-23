const Joi = require('joi')

const createTagSchema = Joi.object({
    name: Joi.string().required().min(5).max(30).messages({
        "any.required": "El name es requerido",
        "string.base": "El name debe ser una cadena de texto",
        "string.min": "El name debe tener como minimo {#limit} caracteres",
        "string.max": "El name debe tener como maximo {#limit} caracteres",
    })
})

const updateTagSchema = Joi.object({
    name: Joi.string().min(5).max(30).optional().messages({
        "string.base": "El name debe ser una cadena de texto",
        "string.min": "El name debe tener como minimo {#limit} caracteres",
        "string.max": "El name debe tener como maximo {#limit} caracteres",
    })
})



module.exports = {
    createTagSchema,
    updateTagSchema
}