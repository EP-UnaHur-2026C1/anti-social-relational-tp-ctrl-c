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
        const userId = Number(req.params.id)
        const {texto} = req.body;
        const newPost = await Post.create({
            texto,
            user_id: userId
        });
        res.status(201).json(newPost);
    }
    catch (error) {
        res.status(500).json({message: 'Error al crear el post'});
    }
};
const updatePost = async (req, res) => {
    try {
        const id = req.params.userId;
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
        console.log("Error: ", error)
        res.status(500).json({message: 'Error al eliminar el post'});
    }
}

const getUserByIdPost = async (req, res) => {
    try {
        const id = req.params.id;
        const user = await Post.findOne({
            where: {id},
            include: {
                model: User,
                as: 'usuario',
                attributes: ['nickName']
            }

        })
        res.status(200).json(user.usuario);
    }catch (error) {
        res.status(500).json({message: 'Error al obtener el usuario del post'});
    }
}
const getCommentsByPostId = async (req, res) => {
    try {
        const id = req.params.id;
        const post = await Post.findOne({
            where: {id},
            include: [{
                model: Comment,
                as: 'comentarios',
                attributes:['contenido', 'fecha']
            }]
        })
        res.status(200).json(post.comentarios);
    }catch (error) {
        res.status(500).json({message: 'Error al obtener los comentarios del post'});
    }
}

const getTagsByPostId = async (req, res) => {
    try {
        const id = req.params.id;
        const post = await Post.findOne({
            where: {id},
            include: [{
                model: Tag,
                as: 'tags',
                attributes: ['name'],
                through: {attributes: []}
            }]
        })
        res.status(200).json(post.tags);
    } catch (error) {
        res.status(500).json({message: 'Error al obtener los tags del post'});
    }

}





module.exports = {
    getPosts,
    getPostById,
    getUserByIdPost,
    getCommentsByPostId,
    getTagsByPostId,
    createPost,
    updatePost,
    deletePost
};