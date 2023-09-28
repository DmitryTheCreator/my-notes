import { $authHost } from './index'

export const getUsers = async () => {
  const {data} = await $authHost.get('api/users')
  return data
}

export const changeActiveStatus = async (id) => {
  const {data} = await $authHost.post(`api/users/active`, { id })
  return data
}

export const changeRole = async (id) => {
  const {data} = await $authHost.post(`api/users/role`, { id })
  return data
}

export const registration = async (login, password) => {
  const {data} = await $authHost.post('api/users', {login, password})
  return data
}
