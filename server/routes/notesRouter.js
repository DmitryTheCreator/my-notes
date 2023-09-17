const Router = require('express')
const router = new Router()
const NotesController =require('../controllers/notesController')
const notesController = require('../controllers/notesController')

router.get('/', notesController.getAll)
router.post('/', notesController.createOne)
router.put('/:id', notesController.editOne)
router.delete('/:id', notesController.deleteOne)

module.exports = router