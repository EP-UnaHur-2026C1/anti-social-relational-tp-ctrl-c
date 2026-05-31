const {Router} = require('express');
const router = Router();
const {getUsers,
       getUserById,
       getCommentsByUserId,
       getPostsByUserId,
       createUser,
       updateUser,
       seguirUsuario,
       dejarDeSeguirUsuario,
       deleteUser} = require('../controllers/user.controller')
const middleware = require('../middlewares/validaciones.middleware');
const {User} = require('../db/models');
const schemaValidator = require('../middlewares/schemaValidator.middleware')
const {createUserSchema, updateUserSchema} = require('../schemas/user.schema')

router.get('/', getUsers)
router.get('/:id',middleware.validaIdNumerico, middleware.validaExisteMiddleware(User) ,getUserById)
router.get('/:id/comments',middleware.validaIdNumerico, middleware.validaExisteMiddleware(User) ,getCommentsByUserId)
router.get('/:id/posts',middleware.validaIdNumerico, middleware.validaExisteMiddleware(User) ,getPostsByUserId)
router.post('/create', schemaValidator(createUserSchema), createUser)
router.post('/:id/seguir/:idToFollow',
    middleware.validaIdNumerico,
    middleware.validaExisteMiddleware(User),
    middleware.validaFollow(User),
    seguirUsuario)
router.put('/:id',schemaValidator(updateUserSchema) ,middleware.validaIdNumerico ,middleware.validaExisteMiddleware(User), updateUser)
router.delete('/:id/unfollow/:idToFollow',
    middleware.validaIdNumerico,
    middleware.validaExisteMiddleware(User),
    middleware.validaFollow(User),
    dejarDeSeguirUsuario
)
router.delete('/:id',middleware.validaIdNumerico ,middleware.validaExisteMiddleware(User), deleteUser)
router.delete('/:id',middleware.validaIdNumerico, middleware.validaExisteMiddleware(User), deleteUser)

module.exports = router;