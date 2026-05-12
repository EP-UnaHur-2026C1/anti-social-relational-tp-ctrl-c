const {Router} = require('express');
const router = Router();
const {getPost, getPostById, createPost, updatePost, deletePost} = require('../controllers/post.controller');
router.get('/', getPost)
router.get('/:id', getPostById)
router.post('/create', createPost)
router.put('/:id', updatePost)
router.delete('/:id', deletePost)

module.exports = router;