const {Router} = require('express');
const router = Router();
const middleware = require('../middlewares/validaciones.middleware');
const {Post} = require('../db/models');
const {getPosts, getPostById, createPost, updatePost, deletePost} = require('../controllers/post.controller');


router.get('/' ,getPosts)
router.get('/:id',middleware.validaIdNumerico,middleware.validaExisteMiddleware(Post), getPostById)
router.post('/create', createPost)
router.put('/:id',middleware.validaIdNumerico,middleware.validaExisteMiddleware(Post), updatePost)
router.delete('/:id',middleware.validaIdNumerico,middleware.validaExisteMiddleware(Post) ,deletePost)

module.exports = router;