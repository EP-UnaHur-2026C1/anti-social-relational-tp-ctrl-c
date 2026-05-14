const {Router} = require('express');
const router = Router();
const {getTags, getTagById, createTag,updateTag, deleteTag} = require('../controllers/tag.controller')
const middleware = require('../middlewares/validaciones.middleware')
const {Tag} = require('../db/models')


router.get('/', getTags)
router.get('/:id',middleware.validaIdNumerico,middleware.validaExisteMiddleware(Tag), getTagById)
router.post('/create', createTag)
router.put('/:id',middleware.validaIdNumerico,middleware.validaExisteMiddleware(Tag), updateTag)
router.delete('/:id',middleware.validaIdNumerico,middleware.validaExisteMiddleware(Tag), deleteTag)

module.exports = router;