const BaseJoi = require('joi')
const JoiDate = require('@joi/date')
const Joi = BaseJoi.extend(JoiDate)

const schema = Joi.object({
    fecha: Joi.date().required().format('YYYY-MM-DD').min('2020-01-01').messages({
        "any.required": "La fecha es requerida",
        "date.base": "La fecha debe ser una fecha válida",
        "date.format": "La fecha debe tener el formato YYYY-MM-DD",
        "date.less": "La fecha no puede ser posterior a la fecha actual",
        "date.min": "La fecha no puede ser anterior a {#limit}"
    }),
    contenido: Joi.string().required().min(10).max(200).messages({
        "any.required": "El contenido es requerido",
        "string.base": "El contenido debe ser una cadena de texto",
        "string.min": "El contenido debe tener como minimo {#limit} caracteres",
        "string.max": "El contenido debe tener como maximo {#limit} caracteres",
    }),
    post_id: Joi.number().integer().positive().messages({})
})

module.exports = schema;