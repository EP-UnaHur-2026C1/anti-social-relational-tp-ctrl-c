const { Post } = require('../db/models');

const getPost = async (req, res) => {
    const post = await Post.findAll();
    res.status(200).json(post);
};


const getPostById = async (req, res) => {
    const id = req.params.id;
    const post = await Post.findByPk(id);

    res.status(200).json(post);
};

const createPost = async (req, res) => {
    const { texto, fecha } = req.body;
    const Post = await Post.create({
        texto,
        fecha,
    });
    res.status(201).json(Post);
};
const updatePost = async (req, res) => {
    const id = req.params.id;
    const { texto, fecha } = req.body;
    const newPost = await Post.update({
       texto,
       fecha
    }, {
        where: {id}
        }
    )
res.status(200).json(newPost);
}

const deletePost = async (req, res) => {
    const id = req.params.id;
    await Post.destroy({
        where: {id}
    });
    res.status(204).json({message: 'Post eliminado'});
}

module.exports = {getPost, getPostById, createPost,updatePost, deletePost};