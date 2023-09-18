import Router from 'express'
const router = new Router()
import {check} from 'express-validator'
import UsersController from '../controllers/usersController.js'

router.get('/:login', UsersController.getOne)
router.get('/', UsersController.getAll)
router.post('/', [
  check('login', "Имя пользователя не может быть пустым").notEmpty(),
  check('password', "Пароль должен быть больше 4 и меньше 30 символов").isLength({min: 4, max: 30})
], UsersController.registration)
router.patch('/:id/active', UsersController.changeActiveStatus)
router.patch('/:id/role', UsersController.changeRole)
router.delete('/:id', UsersController.deleteOne)

export default router