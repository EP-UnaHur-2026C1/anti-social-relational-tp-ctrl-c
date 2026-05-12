const { Tag } = require('../db/models');

const getTag = async (req, res) => {
    const tag = await Tag.findAll();
    res.status(200).json(tag);

};


const getTagById = async (req, res) => {
    const id = req.params.id;
    const tag = await Tag.findByPk(id);

    res.status(200).json(tag);
};

const createTag = async (req, res) => {
    try {
        const data = req.body;
        const newTag = await Tag.create(data);
        res.status(201).json(newTag);
    }
    catch (error) {
        res.status(500);
    }
};
const updateTag = async (req, res) => {
    const id = req.params.id;
    const actualizacion = req.body;
    const newTag = await Tag.update({
       actualizacion
    }, {
        where: {id}
        }
    )
res.status(200).json(newTag);
}

const deleteTag = async (req, res) => {
    const id = req.params.id;
    await Tag.destroy({
        where: {id}
    });
    res.status(204).json({message: 'Tag eliminado'});
}

module.exports = {getTag, getTagById, createTag,updateTag, deleteTag};