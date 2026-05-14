const { Tag } = require('../db/models');

const getTags = async (req, res) => {
    try {
        const tag = await Tag.findAll();
        res.status(200).json(tag);
    }
    catch (error) {
        res.status(500).json({message: 'Error al obtener las tags'});
    }
};


const getTagById = async (req, res) => {
    try {
        const id = req.params.id;
        const tag = await Tag.findByPk(id);

        res.status(200).json(tag);
    }
    catch (error) {
        res.status(500).json({message: `Error al obtener el tag`});
    }
};

const createTag = async (req, res) => {
    try {
        const data = req.body;
        const newTag = await Tag.create(data);
        res.status(201).json(newTag);
    }
    catch (error) {
        res.status(500).json({message: 'Error al crear el tag'});
    }
};
const updateTag = async (req, res) => {
    try {
        const id = req.params.id;
        const actualizacion = req.body;
        const newTag = await Tag.update({
                actualizacion
            }, {
                where: {id}
            }
        )
        res.status(200).json(newTag);
    }catch (error) {
        res.status(500).json({message: 'Error al actualizar el tag'});
    }
}

const deleteTag = async (req, res) => {
    try {
        const id = req.params.id;
        await Tag.destroy({
            where: {id}
        });
        res.status(204).json({message: 'Tag eliminado'});
    }catch (error) {
        res.status(500).json({message: 'Error al eliminar el tag'});
    }
}

module.exports = {getTags, getTagById, createTag,updateTag, deleteTag};