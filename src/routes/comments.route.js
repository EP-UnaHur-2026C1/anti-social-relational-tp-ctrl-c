const {Router} = require('express');
const router = Router();
const middleware = require('../middlewares/validaciones.middleware');
const {Comment, User, Post} = require('../db/models');
const {getComments, getCommentById, createComment, updateComment, deleteComment} = require('../controllers/comments.controller');
const schemaValidator = require('../middlewares/schemaValidator.middleware')
const {createCommentSchema, updateCommentSchema} = require('../schemas/comment.schema')


router.get('/',getComments)
router.get('/:id',middleware.validaIdNumerico,middleware.validaExisteMiddleware(Comment), getCommentById)
router.post('/create',schemaValidator(createCommentSchema),createComment)
router.put('/:id',schemaValidator(updateCommentSchema),middleware.validaIdNumerico ,updateComment)
router.delete('/:id',middleware.validaIdNumerico,middleware.validaExisteMiddleware ,deleteComment)

module.exports = router;