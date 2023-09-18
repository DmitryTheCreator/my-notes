import ApiResponse from "../helpers/apiResponse.js"
import { User } from "../models/models.js"
import bcrypt from 'bcrypt'
import generateToken from "../helpers/generateToken.js"

class AuthController {
  async login(req, res, next) {
    try {
      const {login, password} = req.body
      const user = await User.findOne({where: {login}})
      if (!user) {
        return next(ApiResponse.NotFound('Пользователь не найден'))
      }
      let comparePassword = bcrypt.compareSync(password, user.password)
      if (!comparePassword) {
        return next(ApiResponse.BadRequest('Указан неверный пароль'))
      }
      const token = generateToken(user.id, user.login, user.role, user.active)
      return res.json(ApiResponse.OK({token}))
    } catch(error) {
      return next(ApiResponse.Forbidden(error.message, null));
    }
  }

  async logout(req, res) {
    return res.json(ApiResponse.OK('Вы успешно вышли из системы', null))
  }
}

export default new AuthController()