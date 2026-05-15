const Joi = require('joi')

const schema = Joi.object({
    name: Joi.string().required().min(5).max(30).messages({
        "any.required": "El name es requerido",
        "string.base": "El name debe ser una cadena de texto",
        "string.min": "El name debe tener como minimo {#limit} caracteres",
        "string.max": "El name debe tener como maximo {#limit} caracteres",
    })
})

module.exports = schema;