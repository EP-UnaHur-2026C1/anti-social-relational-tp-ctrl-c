const Joi = require('joi')

const createPostImageSchema  = Joi.object({
    post_id: Joi.number().integer().positive().required().messages({
        "any.required" :"post_id es requerido",
        "number.base": "post_id debe ser un número",
        "number.integer": "post_id debe ser un número entero",
        "number.positive": "post_id debe ser un número positivo"
    })
    
})

const updatePostImageSchema = Joi.object({
    url: Joi.string().uri().min(1).max(500).optional().messages({
        "string.base": "la url debe ser un string",
        "string.empty" : "La url no puede estar vacia",
        "string.min": "La url debe tener al menos {#limit} caracter",
        "string.max" : "La url debe tener como máximo {#limit} caracteres"
    }),
})

module.exports = {
    createPostImageSchema,
    updatePostImageSchema
}