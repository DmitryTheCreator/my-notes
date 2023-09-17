const Router = require('express')
const router = new Router()
const UsersController = require('../controllers/usersController')
const usersController = require('../controllers/usersController')

router.get('/', UsersController.getAll)
router.post('/', UsersController.createOne)
router.patch('/:id/active', usersController.changeActiveStatus)
router.patch('/:id/role', usersController.changeRole)
router.delete('/:id', usersController.deleteOne)

module.exports = router