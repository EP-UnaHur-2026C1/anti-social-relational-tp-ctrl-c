const {Router} = require('express');
const router = Router();
const {getTags, getTagById, createTag,updateTag, deleteTag} = require('../controllers/tag.controller')

router.get('/', getTags)
router.get('/:id', getTagById)
router.post('/create', createTag)
router.put('/:id', updateTag)
router.delete('/:id', deleteTag)

module.exports = router;