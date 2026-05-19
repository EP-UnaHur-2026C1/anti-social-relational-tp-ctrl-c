const BaseJoi = require('joi')
const JoiDate = require('@joi/date')
const Joi = BaseJoi.extend(JoiDate)

const schema  = Joi.object({
    texto: Joi.string().required().min(1).max(500).messages({
        "any.required" :"texto es requerido",
        "string.min" : "El texto del post debe tener como mínimo {#limit} caracter",
        "string.max" : "El texto del post debe tener como máximo {#limit} caracteres"
    }),

    fecha: Joi.date().required().format('YYYY-MM-DD').messages({
        "any.required" :"fecha es requerida",
        "date.format": "La fecha debe tener el formato YYYY-MM-DD"
    })
})

module.exports = schema