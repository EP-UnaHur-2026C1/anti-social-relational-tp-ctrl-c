const validaIdNumerico =(req,res,next) => {
    const id = req.params.id
    if (!Number.isInteger(+id) || +id <= 0) {
        return res.status(400).json({ error: 'El ID debe ser un número entero positivo' });
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

const validaFollow = (ModeloUser) => {
    return async (req, res, next) => {

        const myId = Number(req.params.id);
        const idToFollow = Number(req.params.idToFollow);


        if (!Number.isInteger(idToFollow) || idToFollow <= 0) {
            return res.status(400).json({ error: 'El ID a seguir debe ser un número entero positivo' });
        }


        if (myId === idToFollow) {
            return res.status(400).json({ error: 'No puedes seguirte a ti mismo' });
        }


        const usuarioDestino = await ModeloUser.findByPk(idToFollow);
        if (!usuarioDestino) {
            return res.status(404).json({ error: `El usuario a seguir (ID: ${idToFollow}) no existe` });
        }

        next();
    }
}


module.exports = {validaIdNumerico, validaExisteMiddleware, validaFollow};