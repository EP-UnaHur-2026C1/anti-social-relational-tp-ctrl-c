const {Router} = require('express');
const router = Router();
const {getPostImages, getPostImageById, createPostImage, updatePostImage, deletePostImage} = require('../controllers/post_image.controller');
const {Post_Image} = require('../db/models')
const middleware = require('../middlewares/validaciones.middleware')
const schemaValidator = require('../middlewares/schemaValidator.middleware')
const {createPostImageSchema, updatePostImageSchema} = require('../schemas/post_image.schema')
const upload = require('../middlewares/upload.middleware')


router.get('/', getPostImages)
router.get('/:id',middleware.validaIdNumerico,middleware.validaExisteMiddleware(Post_Image), getPostImageById)
router.post('/create',upload.single('image'),schemaValidator(createPostImageSchema), createPostImage)
router.put('/:id', schemaValidator(updatePostImageSchema) ,middleware.validaIdNumerico, middleware.validaExisteMiddleware(Post_Image), updatePostImage)
router.delete('/:id',middleware.validaIdNumerico,middleware.validaExisteMiddleware(Post_Image) ,deletePostImage)

module.exports = router;