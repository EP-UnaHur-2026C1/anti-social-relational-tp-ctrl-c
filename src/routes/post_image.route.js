const {Router} = require('express');
const router = Router();
const {getPostImage, getPostImageById, createPostImage, updatePostImage, deletePostImage} = require('../controllers/post_image.controller');
router.get('/', getPostImage)
router.get('/:id', getPostImageById)
router.post('/create', createPostImage)
router.put('/:id', updatePostImage)
router.delete('/:id', deletePostImage)

module.exports = router;