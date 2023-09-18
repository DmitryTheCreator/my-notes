import Router from 'express'
const router = new Router()
import authRouter from './authRouter.js'
import usersRouter from './usersRouter.js'
import notesRouter from './notesRouter.js'
import authMiddleware from '../middleware/authMiddleware.js'
import roleMiddleware from '../middleware/roleMiddleware.js'
import activeMiddleware from '../middleware/activeMiddleware.js'

router.use('/auth', authRouter)
router.use('/users', [
  authMiddleware,
  roleMiddleware('ADMIN')
], usersRouter)
router.use('/notes', [
  authMiddleware,
  activeMiddleware
], notesRouter)

export default router