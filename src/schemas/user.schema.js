const Joi = require('joi')

const createUserSchema = Joi.object({
    nickName: Joi.string()
        .trim()
        .required()
        .min(5)
        .max(30)
        .messages({
            "any.required": "El NickName es requerido",
            "string.base": "El nickName debe ser una cadena de texto",
            "strin.empty": "El nickName no puede estar vacio",
            "string.min": "El NickName debe tener como minimo {#limit} caracteres",
            "string.max": "El NickName debe tener como maximo {#limit} caracteres"
    })
})

const updateUserSchema = Joi.object({
    nickName: Joi.string()
        .trim()
        .min(5)
        .max(30)
        .optional()
        .messages({
            'string.base': 'El nickName debe ser una cadena de texto',
            'string.empty': 'El nickName no puede estar vacío',
            'string.min': 'El nickName debe tener como mínimo {#limit} caracteres',
            'string.max': 'El nickName debe tener como máximo {#limit} caracteres',
        })
})

module.exports = {
    createUserSchema,
    updateUserSchema
};