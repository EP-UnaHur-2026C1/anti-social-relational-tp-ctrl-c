const {Router} = require('express');
const router = Router();
const middleware = require('../middlewares/validaciones.middleware');
const {Comment} = require('../db/models');
const {getComments, getCommentById, createComment, updateComment, deleteComment} = require('../controllers/comments.controller');

router.get('/',getComments)
router.get('/:id',middleware.validaIdNumerico,middleware.validaExisteMiddleware(Comment), getCommentById)
router.post('/create', createComment)
router.put('/:id',middleware.validaIdNumerico ,updateComment)
router.delete('/:id',middleware.validaIdNumerico, deleteComment)

module.exports = router;