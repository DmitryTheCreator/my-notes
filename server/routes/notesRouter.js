import Router from 'express'
const router = new Router()
import notesController from '../controllers/notesController.js'

router.get('/', notesController.getAll)
router.post('/', notesController.createOne)
router.put('/:id', notesController.editOne)
router.delete('/:id', notesController.deleteOne)

export default router