import { User } from "../models/models.js"

class AuthController {
  async login(req, res) {
    // const {login, password} = req.body
    // const user = await User.create({login, password})
    // return res.json(user)
  }
  async logout(req, res) {
    
  }
}

export default new AuthController()