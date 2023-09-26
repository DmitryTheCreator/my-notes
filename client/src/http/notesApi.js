import { $authHost } from './index'

export const getNotes = async () => {
  const {data} = await $authHost.get('api/notes')
  return data
}

export const postNote = async (title, message) => {
  const response = await $authHost.post('api/notes', {title, message})
  return response
}

export const putNote = async (id, title, message) => {
  const response = await $authHost.put(`api/notes?id=${id}`, {title, message})
  return response
}

export const deleteNote = async (id) => {
  const response = await $authHost.delete(`api/notes?id=${id}`)
  return response
}
