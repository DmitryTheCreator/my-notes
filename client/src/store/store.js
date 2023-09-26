import { createStore } from 'vuex'
import { getNotes, deleteNote, putNote } from '../http/notesApi'

export default createStore({
  state: {
    notes: [],
    selectedNote: null,
    areNotesLoading: false
  },
  mutations: {
    setNotes(state, notes) {
      state.notes = notes
    },
    setAreNotesLoading(state, isLoading) {
      state.areNotesLoading = isLoading
    },
    updateNoteTitle(state, { noteId, newTitle }) {
      const note = state.notes.find(note => note.id === noteId)
      if (note) {
        note.title = newTitle
      }
    },
    updateNoteMessage(state, { noteId, newMessage }) {
      const note = state.notes.find(note => note.id === noteId)
      if (note) {
        note.message = newMessage
      }
    },
    setSelectedNote(state, note) {
      state.selectedNote = note
    },
    updateSelectedNoteTitle(state, title) {
      if (state.selectedNote) {
        state.selectedNote.title = title
      }
    },
    updateSelectedNoteMessage(state, message) {
      if (state.selectedNote) {
        state.selectedNote.message = message
      }
    },
    addNote(state, newNote) {
      state.notes.push(newNote)
    },
    deleteNote(state, noteId) {
      const index = state.notes.findIndex(note => note.id === noteId)
      if (index !== -1) {
        state.notes.splice(index, 1)
      }
  
      if (state.selectedNote && state.selectedNote.id === noteId && state.notes.length > 0) {
        const selectedIndex = state.notes.findIndex(note => note.id === state.selectedNote.id)
        if (selectedIndex > 0) {
          state.selectedNote = state.notes[selectedIndex - 1]
        } else {
          state.selectedNote = state.notes[0]
        }
      }
      
    }
  },
  actions: {
    async fetchNotes({ commit }) {
      try {
        commit('setAreNotesLoading', true)
        const savedNotes = localStorage.getItem('notes')
        if (savedNotes) {
          commit('setNotes', JSON.parse(savedNotes))
        } else {
          const response = await getNotes()
          commit('setNotes', response.data)
        }
        commit('setAreNotesLoading', false)
      } catch (error) {
        commit('setAreNotesLoading', false)
        alert('Ошибка при загрузке списка заметок:', error)
      }
    },
    async saveNoteChanges({ commit }, { noteId, newTitle, newMessage }) {
      try {
        await putNote(noteId, newTitle, newMessage)
        commit('updateNoteTitle', { noteId, newTitle })
        commit('updateNoteMessage', { noteId, newMessage })
      } catch (error) {
        alert('Ошибка при сохранении заметки:', error)
      }
    },
    async deleteNote({ commit }, noteId) {
      try {
        await deleteNote(noteId)
        commit('deleteNote', noteId)
      } catch (error) {
        alert(`Ошибка удаления заметки: ${error.message}`)
      }
    }
  },
  modules: {}
})
