import { User } from "../models/models.js"

class UsersController {
  async getOne(req, res) {
    const {login} = req.params
    const user = await User.findOne({where: {login}})
    return res.json(user)
  }  
  async getAll(req, res) {
    const user = await User.findAll()
    return res.json(user)
  }
  async createOne(req, res) {
    // const {login, password, role, active} = req.body
    // const user = await User.create({login, password, role, active})
    // return res.json(user)
  }

  async changeActiveStatus(req, res) {
    const {id} = req.params
    const user = await User.findOne({where: {id}})
    user.active = user.active == 'ACTIVATED' ?  'DEACTIVATED': 'ACTIVATED'
    await user.save()
    return res.json(user)
  }
  async changeRole(req, res) {
    const {id} = req.params
    const user = await User.findOne({where: {id}})
    user.role = user.role == 'USER' ?  'ADMIN': 'USER'
    await user.save()
    return res.json(user)
  }
  async deleteOne(req, res) {
    const {id} = req.params
    await User.destroy({where: {id}})
    return res.json('ok')
  }
}

export default new UsersController()