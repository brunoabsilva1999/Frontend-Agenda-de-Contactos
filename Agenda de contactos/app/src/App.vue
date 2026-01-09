<template>
  <div id="app">
    <h1>Agenda de Contactos</h1>

    <div class="container">
      <!-- LISTA DE CONTACTOS -->
      <div class="left">
        <ContactList @edit-contact="selectContact" ref="contactList" />
      </div>

      <!-- FORMULÁRIO + NOTAS + ENDEREÇOS -->
      <div class="right">
        <!-- FORMULÁRIO DE CONTACTO -->
        <ContactForm
          :selectedContact="selectedContact"
          @contact-saved="onContactSaved"
        />

        <!-- FORMULÁRIO DE ENDEREÇOS -->
        <AddressForm v-if="selectedContact" :contactId="selectedContact.id" />

        <!-- LISTA DE NOTAS -->
        <NoteList v-if="selectedContact" :contactId="selectedContact.id" />
      </div>
    </div>
  </div>
</template>

<script>
import ContactList from './components/ContactList.vue'
import ContactForm from './components/ContactForm.vue'
import AddressForm from './components/AddressForm.vue'
import NoteList from './components/NoteList.vue'

export default {
  name: 'App',
  components: {
    ContactList,
    ContactForm,
    AddressForm,
    NoteList
  },
  data() {
    return {
      selectedContact: null
    }
  },
  methods: {
    // Recebe o contacto selecionado da lista
    selectContact(contact) {
      this.selectedContact = contact
    },

    // Depois de criar/editar contacto, recarrega a lista e limpa seleção
    onContactSaved() {
      this.$refs.contactList.loadContacts()
      this.selectedContact = null
    }
  }
}
</script>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  padding: 20px;
  max-width: 800px;
  margin: auto;
}

h1 {
  text-align: center;
  margin-bottom: 30px;
  color: #2c3e50;
}

/* FORMULÁRIO */
form {
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 8px;
  border: 1px solid #ddd;
  box-shadow: 0 2px 5px rgba(0,0,0,0.05);
  margin-bottom: 30px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

input,
select,
textarea {
  width: 100%;
  padding: 8px 10px;
  border-radius: 4px;
  border: 1px solid #ccc;
}

button {
  background-color: #2c3e50;
  color: #fff;
  border: none;
  padding: 10px;
  cursor: pointer;
  border-radius: 4px;
  transition: background-color 0.2s;
}

button:hover {
  background-color: #1a252f;
}

/* TABELA DE CONTACTOS */
table {
  width: 100%;
  border-collapse: collapse;
}

th {
  text-align: left;
  padding: 10px;
  background-color: #ecf0f1;
}

td {
  padding: 10px;
  border-bottom: 1px solid #ddd;
}

.actions {
  text-align: center;
  white-space: nowrap;
}

.edit {
  background: #3498db;
  color: white;
  border: none;
  padding: 5px 8px;
  margin-right: 5px;
  border-radius: 4px;
  cursor: pointer;
}

.delete {
  background: #e74c3c;
  color: white;
  border: none;
  padding: 5px 8px;
  border-radius: 4px;
  cursor: pointer;
}

/* Responsividade (opcional) */
@media (max-width: 600px) {
  form {
    padding: 15px;
  }
}
</style>
