const { Post_Image } = require('../db/models');
const {json} = require("express");

const getPostImages = async (req, res) => {
    try {
        const postImage = await Post_Image.findAll();
        res.status(200).json(postImage);
    }catch (error) {
        res.status(500).json({message: `${error.message}`});
    }
};


const getPostImageById = async (req, res) => {
    try {
        const id = req.params.id;
        const postImage = await Post_Image.findByPk(id);

        res.status(200).json(postImage);
    }catch (error) {
        res.status(500).json({message: `Error al obtener el post`});
    }
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
    try {
        const id = req.params.id;
        const {url} = req.body;
        const newPostImage = await Post_Image.update({
                url,
            }, {
                where: {id}
            }
        )
        res.status(200).json(newPostImage);
    }catch (error) {
        res.status(500).json({message: 'Error al actualizar el post'});
    }
}

const deletePostImage = async (req, res) => {
    try {
        const id = req.params.id;
        await Post_Image.destroy({
            where: {id}
        });
        res.status(204).json({message: 'Post eliminado'});
    }catch (error) {
        res.status(500).json({message: 'Error al eliminar el post'});
    }
}

module.exports = {getPostImages, getPostImageById, createPostImage,updatePostImage, deletePostImage};