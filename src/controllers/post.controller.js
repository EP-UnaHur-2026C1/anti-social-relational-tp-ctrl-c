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
    try {
        const data = req.body;
        const newPost = await Post.create(data);
        res.status(201).json(newPost);
    }
    catch (error) {
        console.error('Error name:', error.name);
        console.error('Error message:', error.message);
        console.error('Error errors:', error.errors);
    }
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