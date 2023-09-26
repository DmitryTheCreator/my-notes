<template>
  <div class="width">
    <div class="container flex indents">
      <b-form-input
        type="search"
        v-model="titleForEditing"
        @blur="saveChanges"
        placeholder="Заголовок..." 
        size="lg"
      />
      <b-form-textarea
        v-model="messageForEditing"
        @blur="saveChanges"
        placeholder="Текст..."
        size="lg"
        no-resize
      />
    </div>
  </div>
</template>

<script>
import { computed, onMounted, ref, watch } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

export default {
  setup() {
    const store = useStore()
    const router = useRouter()
    const titleForEditing = ref('')
    const messageForEditing = ref('')
    const selectedNote = computed(() => store.state.selectedNote)

    watch(selectedNote, (newNote) => {
      if (newNote) {
        titleForEditing.value = newNote.title
        messageForEditing.value = newNote.message
      }
    })

    onMounted(() => {
      store.dispatch('fetchNotes').then(() => {
        const noteIdFromRoute = router.currentRoute.value.query.id
        if (noteIdFromRoute) {
          const note = store.state.notes.find(note => note.id === parseInt(noteIdFromRoute))
          if (note) {
            store.commit('setSelectedNote', note)
            titleForEditing.value = note.title
            messageForEditing.value = note.message
          }
        }
      })
    })

    const saveChanges = async () => {
      if (selectedNote.value) {
        try {
          await store.dispatch('saveNoteChanges', {
            noteId: selectedNote.value.id,
            newTitle: titleForEditing.value,
            newMessage: messageForEditing.value,
          })
        } catch (error) {
          alert('Ошибка при сохранении заметки:', error.message)
        }
      }
    }

    return {
      selectedNote,
      saveChanges,
      titleForEditing,
      messageForEditing
    }
  }
}
</script>

<style scoped>
.width {
  width: 100%;
}

.indents {
  gap: 10px;
  padding: 20px 0;
  height: 100%;
  box-sizing: border-box; 
}

input {
  font-weight: 500;
}

textarea {
  height: calc(100% - 80px);
}
</style>
