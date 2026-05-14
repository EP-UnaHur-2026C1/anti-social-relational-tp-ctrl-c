const validaIdNumerico =(req,res,next) => {
    const id = req.params.id;
    if (isNaN(id)) {
        return res.status(400).json({ error: 'El ID debe ser un número' });
    }
    next();
}



const validaExisteMiddleware =  (Modelo) => {
    return async (req, res, next) => {
        const id = req.params.id;
        const busqueda = await Modelo.findByPk(id);
        if (!busqueda) {
            return res.status(404).json({ error: `El id ${id} en el registro ${Modelo.name} no existe` });
        }
        next();
    }
}

module.exports = {validaIdNumerico, validaExisteMiddleware};