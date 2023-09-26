import Router from 'express'
const router = new Router()
import notesController from '../controllers/notesController.js'

router.get('/', notesController.getAll)
router.post('/', notesController.createOne)
router.put('/', notesController.editOne)
router.delete('/', notesController.deleteOne)

export default router