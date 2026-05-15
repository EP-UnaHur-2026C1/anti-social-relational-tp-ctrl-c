const Joi = require('joi')

const schema = Joi.object({
    nickName: Joi.string().required().min(5).max(30).messages({
        "any.required": "El NickName es requerido",
        "string.min": "El NickName debe tener como minimo {#limit} caracteres",
        "string.max": "El NickName debe tener como maximo {#limit} caracteres"
    })
})

module.exports = schema;