

const schemaValidator = (schema) => {
    return  (req,res,next) => {
        const {error, value} = schema.validate(req.body, {abortEarly:false, stripUnknown: true})
        if(error){
            return res.status(400).json({
                errores: error.details.map(err =>  {
                    return {
                        atributo: err.path[0],
                        error: err.message
                    }
                })
            })
        }
        req.body = value
        next()
    }
}

module.exports = schemaValidator;

