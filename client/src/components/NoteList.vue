<template>
  <div class="width lato-font">
    <div class="container pd-10">
      <Button @click="createNote">+ Создать новую запись</Button>
      <b-form-input
        type="search"
        v-model="searchText"
        placeholder="Найти..." 
      />
      <div v-if="areNotesLoading">Загрузка...</div>
      <div v-else class="note-card-list note-list-container">
        <NoteCard
          class="indents"
          v-for="note in allNotes.reverse()"
          :key="note.id"
          :note="note"
          @click="selectNote(note)"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, ref, computed } from 'vue'
import { useStore } from 'vuex'
import Button from './UI/Button.vue'
import NoteCard from './NoteCard.vue'
import { postNote } from '../http/notesApi'
import { useRouter } from 'vue-router'

export default {
  components: { Button, NoteCard },
  setup() {
    const store = useStore()
    const router = useRouter()

    const selectNote = (note) => {
      store.commit('setSelectedNote', note)
      router.push({ query: { id: note.id } })
    }

    const createNote = async () => {
      try {
        const response = await postNote('Заголовок', 'Текст')
        const newNote = response.data.data
        store.commit('addNote', newNote)
        store.commit('setSelectedNote', newNote)
      } catch (e) {
        alert(`Ошибка создания заметки: ${e.message}`)
      }
    }

    onMounted(() => {
      store.dispatch('fetchNotes')
        .then(() => {
          if (store.state.notes.length > 0) {
            store.commit('setSelectedNote', store.state.notes[0])
          }
          else {
            alert('Список заметок пуст. Создайте первую заметку!')
          }
        })
        .catch((error) => {
          alert(`Ошибка при загрузке списка заметок: ${error.message}`)
        })
    })

    const searchText = ref('')

    const allNotes = computed(() => {
      const search = searchText.value.toLowerCase().trim()
      const notes = [...store.state.notes] 
      return notes.filter((note) => {
        return (
          note.title.toLowerCase().includes(search) ||
          note.message.toLowerCase().includes(search)
        )
      })
    })

    return {
      store,
      areNotesLoading: store.state.areNotesLoading,
      createNote,
      selectNote,
      searchText,
      allNotes
    }
  }
}
</script>

<style scoped>
.width {
  width: 500px;
}

.pd-10 {
  padding: 0 20px;
}

Button {
  width: 100%;
  height: 60px;
  margin: 20px;
  font-size: 20px;
}

.note-card-list{
  width: 100%;
  margin: 20px 0;
}

.indents {
  margin-bottom: 10px;
}

.note-list-container {
  max-height: 74.4vh;
  overflow-y: auto; 
}
</style>
