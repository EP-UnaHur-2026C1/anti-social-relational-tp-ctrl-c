const { Post,Comment,User,Tag,Post_Image } = require('../db/models');

const getPosts = async (req, res) => {
    try {
        const post = await Post.findAll();
        res.status(200).json(post);
    }catch (error) {
        res.status(500).json({message: 'Error al obtener los posts'});
    }
};


const getPostById = async (req, res) => {
    try {
        const id = req.params.id;
        const post = await Post.findByPk(id, {
            include: [
                {
                    model: Comment,
                    as: 'comentarios'
                },
                {
                    model: User,
                    as: 'usuario'
                },
                {
                    model: Tag,
                    as: 'tags'
                },
                {
                    model: Post_Image,
                    as: 'image'
                }
            ]
        });

        res.status(200).json(post);
    }catch (error) {
        res.status(500).json({message: `Error al obtener el post`});
    }
};

const createPost = async (req, res) => {
    try {
        const data = req.body;
        const newPost = await Post.create(data);
        res.status(201).json(newPost);
    }
    catch (error) {
        res.status(500).json({message: 'Error al crear el post'});
    }
};
const updatePost = async (req, res) => {
    try {
        const id = req.params.id;
        const {texto, fecha} = req.body;
        const newPost = await Post.update({
                texto,
                fecha
            }, {
                where: {id}
            }
        )
        res.status(200).json(newPost);
    }catch (error) {
        res.status(500).json({message: 'Error al actualizar el post'});
    }
}

const deletePost = async (req, res) => {
    try {
        const id = req.params.id;
        await Post.destroy({
            where: {id}
        });
        res.status(204).json({message: 'Post eliminado'});
    }catch (error) {
        res.status(500).json({message: 'Error al eliminar el post'});
    }
}

module.exports = {getPosts, getPostById, createPost,updatePost, deletePost};