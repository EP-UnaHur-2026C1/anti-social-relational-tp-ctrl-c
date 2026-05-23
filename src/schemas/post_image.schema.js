const Joi = require('joi')

const createPostImageSchema  = Joi.object({
    url: Joi.string().uri().required().min(1).max(500).messages({
        "any.required" :"url es requerido",
        "string.base": "la url debe ser un string",
        "string.empty" : "La url no puede estar vacia",
        "string.min": "La url debe tener al menos {#limit} caracter",
        "string.max" : "La url debe tener como máximo {#limit} caracteres"
    }),
    
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