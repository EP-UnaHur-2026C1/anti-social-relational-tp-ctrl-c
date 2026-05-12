const {Comment} = require('../db/models');


const getComments = async (req, res) => {
    const comments = await Comment.findAll();
    res.status(200).json(comments);
};


const getCommentById = async (req, res) => {
    const id = req.params.id;
    const comment = await Comment.findByPk(id);

    res.status(200).json(comment);
};

const createComment = async (req, res) => {
    const { contenido, fecha, es_visible } = req.body;
    const comment = await Comment.create({
        contenido,
        fecha,
        es_visible
    });
    res.status(201).json(comment);
};
const updateComment = async (req, res) => {
    const id = req.params.id;
    const { contenido, fecha, es_visible } = req.body;
    const newComment = await Comment.update({
        contenido,
        fecha,
        es_visible
    }, {
        where: {id}
        }
    )
res.status(200).json(newComment);
}




const deleteComment = async (req, res) => {
    const id = req.params.id;
    await Comment.destroy({
        where: {id}
    });
    res.status(204).json({message: 'Comentario eliminado'});
}

module.exports = {getComments, getCommentById, createComment,updateComment, deleteComment};