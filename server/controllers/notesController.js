import { Note } from '../models/models.js'
import ApiResponse from '../helpers/apiResponse.js';

class NotesController {
  async getAll(req, res, next) {
    try {
      const userId = req.user.id
      const notes = await Note.findAll({ where: { userId } })
      if (!notes) {
        return next(ApiResponse.NotFound('Пользователя с таким id не существует', null));
      }
      return res.json(ApiResponse.OK('Список заметок успешно получен', notes))
    } catch(error) {
      return next(ApiResponse.Forbidden(error.message, null))
    }
  }

  async createOne(req, res, next) {
    try {
      const userId = req.user.id
      const { title, message } = req.body
      const note = await Note.create({ title, message, userId })
      return res.json(ApiResponse.OK('Заметка успешно создана', note))
    } catch (error) {
      return next(ApiResponse.Forbidden(error.message, null))
    }
  }

  async editOne(req, res, next) {
    const { id } = req.params
    const { title, message } = req.body;

    try {
      const note = await Note.findOne({ where: { id } })

      if (!note) {
        return next(ApiResponse.NotFound('Заметка не найдена', null))
      }

      note.title = title || note.title;
      note.message = message || note.message;
      
      await note.save();
      return res.json(ApiResponse.OK('Заметка успешно отредактирована', await note.reload()))
    } catch (error) {
      return next(ApiResponse.Forbidden(error.message, null))
    }
  }

  async deleteOne(req, res, next) {
    try {
      const { id } = req.params;
      const deletedRowCount = await Note.destroy({ where: { id } });
  
      if (deletedRowCount === 0) {
        return next(ApiResponse.NotFound('Заметка не найдена', null))
      }
      return res.json(ApiResponse.OK('Заметка успешно удалена', {}))
    } catch (error) {
      return next(ApiResponse.Forbidden(error.message, null)); 
    }
  }
}

export default new NotesController()