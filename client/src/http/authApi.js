import { $host } from './index'
import jwt_decode from "jwt-decode"

export const login = async (login, password) => {
  const {data} = await $host.post('api/auth/login', {login, password})
  localStorage.setItem('token', data.message.token)
  return jwt_decode(data.message.token)
}

export const logout = () => {
  const response = localStorage.removeItem('token')
  return response
}
