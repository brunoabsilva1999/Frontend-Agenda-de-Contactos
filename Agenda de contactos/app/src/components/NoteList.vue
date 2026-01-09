<template>
  <div class="notes-section">
    <h4>Notas</h4>
    <ul v-if="notes.length">
      <li v-for="note in notes" :key="note.id" class="note-item">
        {{ note.texto }}
        <button class="delete" @click="deleteNoteById(note.id)">Eliminar</button>
      </li>
    </ul>
    <p v-else>Sem notas registadas.</p>

    <form @submit.prevent="addNote" class="note-form">
      <input
        v-model="newNote"
        type="text"
        placeholder="Nova nota"
        required
      />
      <button type="submit">Adicionar</button>
    </form>
  </div>
</template>

<script>
import { ref, watch } from 'vue'
import { getNotes, createNote, deleteNote } from '../services/api'

export default {
  props: {
    contactId: { type: Number, required: true }
  },
  setup(props) {
    const notes = ref([])
    const newNote = ref('')

    const loadNotes = async () => {
      try {
        const res = await getNotes()
        notes.value = res.data.filter(n => n.contacto === props.contactId)
      } catch (err) {
        console.error('Erro ao carregar notas:', err)
      }
    }

    const addNote = async () => {
      if (!newNote.value) return
      try {
        await createNote({ texto: newNote.value, contacto: props.contactId })
        newNote.value = ''
        loadNotes()
      } catch (err) {
        console.error('Erro ao adicionar nota:', err)
      }
    }

    const deleteNoteById = async (id) => {
      try {
        await deleteNote(id)
        loadNotes()
      } catch (err) {
        console.error('Erro ao eliminar nota:', err)
      }
    }

    watch(() => props.contactId, loadNotes, { immediate: true })

    return { notes, newNote, addNote, deleteNoteById }
  }
}
</script>

<style scoped>
.notes-section {
  margin-top: 10px;
  padding-top: 10px;
  border-top: 1px solid #ccc;
}

.notes-section h4 {
  margin-bottom: 5px;
}

.notes-section ul {
  list-style-type: disc;
  margin: 5px 0 10px 20px;
  padding: 0;
}

.note-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 5px;
}

.note-item button.delete {
  background-color: #e74c3c;
  padding: 3px 8px;
  font-size: 12px;
  border-radius: 4px;
  border: none;
  color: white;
  cursor: pointer;
}

.note-form {
  display: flex;
  align-items: center;
  margin-top: 5px;
}

.note-form input {
  flex: 1;
  padding: 5px 8px;
  border-radius: 4px;
  border: 1px solid #ccc;
  margin-right: 5px;
}

.note-form button {
  padding: 5px 12px;
  border-radius: 4px;
  border: none;
  background-color: #3498db;
  color: white;
  cursor: pointer;
  font-size: 13px;
}
</style>