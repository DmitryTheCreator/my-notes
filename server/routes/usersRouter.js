import Router from 'express'
const router = new Router()
import UsersController from '../controllers/usersController.js'

router.get('/:login', UsersController.getOne)
router.get('/', UsersController.getAll)
router.post('/', UsersController.createOne)
router.patch('/:id/active', UsersController.changeActiveStatus)
router.patch('/:id/role', UsersController.changeRole)
router.delete('/:id', UsersController.deleteOne)

export default router