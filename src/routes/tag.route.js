const {Router} = require('express');
const router = Router();
const {getTag, getTagById, createTag,updateTag, deleteTag} = require('../controllers/tag.controller')

router.get('/', getTag)
router.get('/:id', getTagById)
router.post('/create', createTag)
router.put('/:id', updateTag)
router.delete('/:id', deleteTag)

module.exports = router;