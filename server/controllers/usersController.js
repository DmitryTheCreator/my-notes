import { User } from "../models/models.js"
import bcrypt from "bcrypt"
import ApiResponse from '../helpers/apiResponse.js';
import { validationResult } from 'express-validator'

async function findUserById(id) {
  const user = await User.findOne({ where: { id } });
  if (!user) {
    return next(ApiResponse.NotFound('Пользователь не найден', null))
  }
  return user;
}

class UsersController {
  async getOne(req, res, next) {
    try {
      const { id } = req.body;
      const user = await findUserById(id);
      return res.json(ApiResponse.OK('Пользователь успешно получен', user));
    } catch (error) {
      return next(ApiResponse.Forbidden(error.message, null));
    }
  }

  async getAll(req, res) {
    try {
      const user = await User.findAll()
      return res.json(ApiResponse.OK('Список пользователей успешно получен', user))
    } catch(error) {
      return next(ApiResponse.Forbidden(error.message, null))
    }
  }

  async registration(req, res, next) {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return next(ApiResponse.BadRequest("Неверный формат данных", null))
      }
      const {login, password, role, active} = req.body;
      const candidate = await User.findOne({where: {login}})
      if (candidate) {
        return next(ApiResponse.BadRequest('Пользователь с таким логином уже существует', null))
      }
      const hashPassword = bcrypt.hashSync(password, 5);
      const user = new User({
        login: login, 
        password: hashPassword,
        role: role,
        active: active
      })
      await user.save()
      return res.json(ApiResponse.OK('Пользователь успешно зарегистрирован', user))
    } catch(error) {
      return next(ApiResponse.Forbidden(error.message, null))
    }
  }

  async changeActiveStatus(req, res, next) {
    try {
      const { id } = req.body;
      const user = await findUserById(id);
      user.active = user.active === 'ACTIVATED' ? 'DEACTIVATED' : 'ACTIVATED';
      await user.save();
      return res.json(ApiResponse.OK('Статус успешно изменен', user));
    } catch (error) {
      return next(ApiResponse.Forbidden(error.message, null));
    }
  }

  async changeRole(req, res, next) {
    try {
      const { id } = req.body;
      const user = await findUserById(id);
      user.role = user.role === 'USER' ? 'ADMIN' : 'USER';
      await user.save();
      return res.json(ApiResponse.OK('Роль успешно изменена', user));
    } catch (error) {
      return next(ApiResponse.Forbidden(error.message, null));
    }
  }

  async deleteOne(req, res, next) {
    try {
      const { id } = req.params;
      await User.destroy({ where: { id } });
      return res.json(ApiResponse.OK('Пользователь успешно удален', {}));
    } catch (error) {
      return next(ApiResponse.Forbidden(error.message, null));
    }
  }
}

export default new UsersController()