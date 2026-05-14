const {Router} = require('express');
const router = Router();
const {getUsers,
       getUserById,
       createUser,
       updateUser,
       deleteUser} = require('../controllers/user.controller')
const middleware = require('../middlewares/validaciones.middleware');
const {User} = require('../db/models');

router.get('/', getUsers)
router.get('/:id',middleware.validaIdNumerico, middleware.validaExisteMiddleware(User) ,getUserById)
router.post('/create', createUser)
router.put('/:id',middleware.validaIdNumerico ,middleware.validaExisteMiddleware(User), updateUser)
router.delete('/:id',middleware.validaIdNumerico ,middleware.validaExisteMiddleware(User), deleteUser)

module.exports = router;