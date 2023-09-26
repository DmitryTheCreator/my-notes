import {ref, onMounted} from 'vue'
import {postNote} from '../http/notesApi'

export function useModal() {
  const title = ref('')
  const message = ref('')

  const sending = async () => {
    try {
      await postNote(title, message)
    } catch (e) {
      alert('Ошибка создания заметки')
    }
  }
  
  onMounted(sending)

  return form
}