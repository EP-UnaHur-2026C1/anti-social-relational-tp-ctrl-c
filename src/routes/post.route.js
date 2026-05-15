const {Router} = require('express');
const router = Router();
const middleware = require('../middlewares/validaciones.middleware');
const {Post} = require('../db/models');
const {getPosts,
    getPostById,
    getUserByIdPost,
    getCommentsByPostId,
    getTagsByPostId,
    createPost,
    updatePost,
    deletePost
} = require('../controllers/post.controller');


router.get('/' ,getPosts)
router.get('/:id',middleware.validaIdNumerico,middleware.validaExisteMiddleware(Post), getPostById)
router.get('/:id/user',middleware.validaIdNumerico,middleware.validaExisteMiddleware(Post), getUserByIdPost)
router.get('/:id/comments',middleware.validaIdNumerico,middleware.validaExisteMiddleware(Post), getCommentsByPostId)
router.get('/:id/tags',middleware.validaIdNumerico,middleware.validaExisteMiddleware(Post), getTagsByPostId)
router.post('/create', createPost)
router.put('/:id',middleware.validaIdNumerico,middleware.validaExisteMiddleware(Post), updatePost)
router.delete('/:id',middleware.validaIdNumerico,middleware.validaExisteMiddleware(Post) ,deletePost)

module.exports = router;