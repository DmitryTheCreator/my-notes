import Router from 'express'
const router = new Router()
import authRouter from './authRouter.js'
import usersRouter from './usersRouter.js'
import notesRouter from './notesRouter.js'

router.use('/auth', authRouter)
router.use('/users', usersRouter)
router.use('/notes', notesRouter)

export default router