const Router = require('express')
const router = new Router()
const authRouter = require('./authRouter')
const usersRouter = require('./usersRouter')
const notesRouter = require('./notesRouter')

router.use('/auth', authRouter)
router.use('/users', usersRouter)
router.use('/notes', notesRouter)

module.exports = router