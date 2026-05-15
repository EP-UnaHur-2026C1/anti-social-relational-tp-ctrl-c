const {Comment} = require('../db/models');


const getComments = async (req, res) => {
    try {
        const comments = await Comment.findAll();
        res.status(200).json(comments);
    }catch (error) {
        res.status(500).json({message: 'Error al obtener los comentarios'});
    }
};


const getCommentById = async (req, res) => {
    try {
        const id = req.params.id;
        const comment = await Comment.findByPk(id,{
            attributes:['id','contenido','fecha','es_visible_calculado']
        });

        res.status(200).json(comment);
    }catch (error) {
        res.status(500).json({message: `Error al obtener el comentario`});
    }
};

const createComment = async (req, res) => {
    try {
        const data = req.body;
        const comment = await Comment.create(data);
        res.status(201).json(comment);
    }
    catch (error) {
        res.status(500).json({message: 'Error al crear el comentario'});
    }
};
const updateComment = async (req, res) => {
    try{
        const id = req.params.id;
        const data = req.body;
        const newComment = await Comment.update(data , {
            where: {id}
            }
        )
        res.status(200).json(newComment);
    }catch (error) {
        res.status(500).json({message: 'Error al actualizar el comentario'});
    }
}




const deleteComment = async (req, res) => {
    try {
        const id = req.params.id;
        await Comment.destroy({
            where: {id}
        });
        res.status(204).json({message: 'Comentario eliminado'});
    }catch (error) {
        res.status(500).json({message: 'Error al eliminar el comentario'});
    }
}

module.exports = {getComments, getCommentById, createComment,updateComment, deleteComment};