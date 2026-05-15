const Joi = require('joi')

const schema  = Joi.object({
    url: Joi.string().required().max(500).messages({
        "any.required" :"url es requerido",
        "string.max" : "La url debe tener como máximo {#limit} caracteres"
    }),
    
})

module.exports = schema