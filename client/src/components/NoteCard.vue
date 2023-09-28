<template>
  <div class="note-card" :class="isNoteSelected ? 'selected' : 'default'">
    <button v-tooltip:left.tooltip="'Удалить заметку'" class="delete-button" @click.prevent="confirmDelete">❌</button>
    <h1 class="big-24 bold">{{ note.title }}</h1>
    <p>{{ note.message }}</p>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'
import Tooltip from './UI/Tooltip.vue'

export default {
  props: {
    note: Object
  },
  components: { Tooltip },
  setup(props) {
    const store = useStore()

    const isNoteSelected = computed(() => {
      return props.note.id === store.state.selectedNote?.id
    })

    const confirmDelete = async () => {
      const isConfirmed = window.confirm('Вы действительно хотите удалить заметку?')
      if (isConfirmed) {
        try {
          store.dispatch('deleteNote', props.note.id)
        } catch (e) {
          alert(`Ошибка удаления заметки: ${e.message}`)
        }
      }
    }

    return {
      isNoteSelected,
      confirmDelete
    }
  }
}
</script>

<style scoped>
.note-card {
  position: relative;
  width: 100%;
  height: 120px;
  border-radius: 6px;
  padding: 20px;
  transition: all 0.3s;
}

.delete-button {
  position: absolute;
  top: 5px;
  right: 5px;
  background-color: transparent;
  border: none;
  width: 20px;
  height: 20px;
  font-size: 14px;
  cursor: pointer;
}

h1 {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

p {
  padding-top: 10px;
  white-space: nowrap;
  font-size: 18px;
  overflow: hidden;
  text-overflow: ellipsis;
}

.default {
  background-color: #E3D6C8;
  color: #1A1713;
  border: 3px solid #76420C;
}
.default:hover {
  background-color: #F2DED5;
}

.selected {
  background-color: #76420C;
  color: #fff;
  border: 3px solid #E3D6C8;
}
.selected:hover {
  background-color: #6C3428;
}
</style>