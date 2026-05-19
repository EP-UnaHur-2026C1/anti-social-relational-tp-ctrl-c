const {Router} = require('express');
const router = Router();
const middleware = require('../middlewares/validaciones.middleware');
const {Comment} = require('../db/models');
const {getComments, getCommentById, createComment, updateComment, deleteComment} = require('../controllers/comments.controller');
const schemaValidator = require('../middlewares/schemaValidator.middleware')
const commentSchema = require('../schemas/comment.schema')


router.get('/',getComments)
router.get('/:id',middleware.validaIdNumerico,middleware.validaExisteMiddleware(Comment), getCommentById)
router.post('/create',schemaValidator(commentSchema), createComment)
router.put('/:id',schemaValidator(commentSchema),middleware.validaIdNumerico ,updateComment)
router.delete('/:id',middleware.validaIdNumerico,middleware.validaExisteMiddleware ,deleteComment)

module.exports = router;