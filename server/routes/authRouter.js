const Router = require('express')
const router = new Router()
const AuthController = require('../controllers/authController')

router.post('/login', AuthController.login)
router.post('/logout', AuthController.logout)

module.exports = router