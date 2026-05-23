const BaseJoi = require('joi')
const JoiDate = require('@joi/date')
const Joi = BaseJoi.extend(JoiDate)

const createCommentSchema = Joi.object({    fecha: Joi.date().optional().format('YYYY-MM-DD').min('2020-01-01').messages({
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
    post_id: Joi.number().integer().positive().required().messages({
        "number.base": "El post_id debe ser un número",
        "number.integer": "El post_id debe ser un número entero",
        "number.positive": "El post_id debe ser un número positivo",
        "any.required": "El post_id es requerido"
    }),
    user_id: Joi.number().integer().positive().required().messages({
        "number.base": "El user_id debe ser un número",
        "number.integer": "El user_id debe ser un número entero",
        "number.positive": "El user_id debe ser un número positivo",
        "any.required": "El user_id es requerido"
    })
})

const updateCommentSchema = Joi.object({
    fecha: Joi.date().format('YYYY-MM-DD').min('2020-01-01').messages({
        "date.base": "La fecha debe ser una fecha válida",
        "date.format": "La fecha debe tener el formato YYYY-MM-DD",
        "date.less": "La fecha no puede ser posterior a la fecha actual",
        "date.min": "La fecha no puede ser anterior a {#limit}"
    }),
    contenido: Joi.string().min(10).max(200).messages({
        "string.base": "El contenido debe ser una cadena de texto",
        "string.min": "El contenido debe tener como minimo {#limit} caracteres",
        "string.max": "El contenido debe tener como maximo {#limit} caracteres",
    }),
    post_id: Joi.number().integer().positive().messages({
        "number.base": "El post_id debe ser un número",
        "number.integer": "El post_id debe ser un número entero",
        "number.positive": "El post_id debe ser un número positivo"
    }),
    user_id: Joi.number().integer().positive().messages({
        "number.base": "El user_id debe ser un número",
        "number.integer": "El user_id debe ser un número entero",
        "number.positive": "El user_id debe ser un número positivo"
    })
})

module.exports = {
    createCommentSchema,
    updateCommentSchema
}