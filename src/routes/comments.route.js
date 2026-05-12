const {Router} = require('express');
const router = Router();
const {getComments, getCommentById, createComment, updateComment, deleteComment} = require('../controllers/comments.controller');
router.get('/', getComments)
router.get('/:id', getCommentById)
router.post('/create', createComment)
router.put('/:id', updateComment)
router.delete('/:id', deleteComment)

module.exports = router;