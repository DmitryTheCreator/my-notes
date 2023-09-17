import Router from 'express'
const router = new Router()
import AuthController from '../controllers/authController.js'

router.post('/login', AuthController.login)
router.post('/logout', AuthController.logout)

export default router