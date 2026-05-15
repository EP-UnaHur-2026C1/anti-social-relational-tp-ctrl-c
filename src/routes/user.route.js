const {Router} = require('express');
const router = Router();
const {getUsers,
       getUserById,
       getCommentsByUserId,
       getPostsByUserId,
       createUser,
       updateUser,
       deleteUser} = require('../controllers/user.controller')
const middleware = require('../middlewares/validaciones.middleware');
const {User} = require('../db/models');
const schemaValidator = require('../middlewares/schemaValidator.middleware')
const userSchema = require('../schemas/user.schema')

router.get('/', getUsers)
router.get('/:id',middleware.validaIdNumerico, middleware.validaExisteMiddleware(User) ,getUserById)
router.get('/:id/comments',middleware.validaIdNumerico, middleware.validaExisteMiddleware(User) ,getCommentsByUserId)
router.get('/:id/posts',middleware.validaIdNumerico, middleware.validaExisteMiddleware(User) ,getPostsByUserId)
router.post('/create',schemaValidator(userSchema), createUser)
router.put('/:id',middleware.validaIdNumerico ,middleware.validaExisteMiddleware(User), updateUser)
router.delete('/:id',middleware.validaIdNumerico ,middleware.validaExisteMiddleware(User), deleteUser)

module.exports = router;