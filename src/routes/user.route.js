const {Router} = require('express');
const router = Router();
const {getUsers,
       getUserById,
       createUser,
       updateUser,
       deleteUser} = require('../controllers/user.controller')

router.get('/', getUsers)
router.get('/:id', getUserById)
router.post('/create', createUser)
router.put('/:id', updateUser)
router.delete('/:id', deleteUser)

module.exports = router;