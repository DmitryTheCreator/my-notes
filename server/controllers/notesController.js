import { Note } from '../models/models.js'

class NotesController {
  async getAll(req, res) {
    try {
      const {userId} = req.query
      const notes = await Note.findAll({where:{userId}})
      return res.json(notes)
    } catch(e) {
      console.log(e)
    }
  }

  async createOne(req, res) {
    try {
      const {title, message, userId} = req.body
      const note = await Note.create({title, message, userId})
      return res.json(note)
    } catch(e) {
      console.log(e)
    }
   
  }
  async editOne(req, res) {
    const { id } = req.params;
    const { title, message } = req.body;

    const note = await Note.findOne({where:{id}})
    
    note.title = title || note.title; 
    note.message = message || note.message; 

    await note.save();
    return res.json(note)
  }
  async deleteOne(req, res) {
    const {id} = req.params
    await Note.destroy({where: {id}})
    return res.json('ok')
  }
}

export default new NotesController()