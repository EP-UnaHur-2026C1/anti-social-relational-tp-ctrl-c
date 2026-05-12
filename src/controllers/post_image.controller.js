const { Post_Image } = require('../db/models');

const getPostImage = async (req, res) => {
    const postImage = await Post_Image.findAll();
    res.status(200).json(postImage);
};


const getPostImageById = async (req, res) => {
    const id = req.params.id;
    const postImage = await Post_Image.findByPk(id);

    res.status(200).json(post);
};

const createPostImage = async (req, res) => {
    try {
        const data = req.body;
        const newPostImage = await Post_Image.create(data);
        res.status(201).json(newPostImage);
    }
    catch (error) {
        res.status(500);
    }
};
const updatePostImage = async (req, res) => {
    const id = req.params.id;
    const { url } = req.body;
    const newPostImage = await Post_Image.update({
       url,
    }, {
        where: {id}
        }
    )
res.status(200).json(newPostImage);
}

const deletePostImage = async (req, res) => {
    const id = req.params.id;
    await Post_Image.destroy({
        where: {id}
    });
    res.status(204).json({message: 'Post eliminado'});
}

module.exports = {getPostImage, getPostImageById, createPostImage,updatePostImage, deletePostImage};