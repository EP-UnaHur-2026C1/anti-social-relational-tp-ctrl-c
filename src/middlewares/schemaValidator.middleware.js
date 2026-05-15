const {message} = require('../schemas/user.schema')

const schemaValidator = (schema) => {
    return  (req,res,next) => {
        const result = schema.validate(req.body, {abortEarly:false})
        if(result.error){
            return res.status(400).json({
                errores: result.error.details.map(err =>  {
                    return {
                        atributo: err.path[0],
                        error: err.message
                    }
                })
            })
        }
        next()
    }
}

module.exports = schemaValidator;

