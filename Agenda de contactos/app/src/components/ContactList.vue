<template>
  <div>
    <h2>Contactos</h2>

    <table>
      <thead>
        <tr>
          <th>Nome</th>
          <th>Telefone</th>
          <th>Email</th>
          <th>Categoria</th>
          <th class="actions">Ações</th>
        </tr>
      </thead>

      <tbody>
        <template v-for="contact in contacts" :key="contact.id">
          <!-- Modo edição -->
          <tr v-if="editingContactId === contact.id">
            <td colspan="5">
              <form @submit.prevent="saveContact(contact.id)">
                <div>
                  <label>Nome:</label>
                  <input v-model="contact.nome" type="text" required />
                </div>
                <div>
                  <label>Telefone:</label>
                  <input v-model="contact.telefone" type="text" required />
                </div>
                <div>
                  <label>Email:</label>
                  <input v-model="contact.email" type="email" />
                </div>
                <div>
                  <label>Categoria:</label>
                  <select v-model="contact.categoria">
                    <option :value="null">-- Nenhuma --</option>
                    <option v-for="cat in categories" :key="cat.id" :value="cat.id">
                      {{ cat.nome }}
                    </option>
                  </select>
                </div>

                <!-- AddressForm integrado -->
                <AddressForm
                  :endereco="contact.endereco"
                  :addressId="contact.endereco?.id"
                  :contactId="contact.id"
                  @address-updated="loadContacts"
                />

                <div style="margin-top: 10px;">
                  <button type="submit">Salvar Contacto</button>
                  <button type="button" @click="stopEdit">Cancelar</button>
                </div>
              </form>
            </td>
          </tr>

          <!-- Modo lista -->
          <tr v-else class="contact-row">
            <td>{{ contact.nome }}</td>
            <td>{{ contact.telefone }}</td>
            <td>{{ contact.email || '-' }}</td>
            <td>{{ contact.categoria_nome || '-' }}</td>
            <td class="actions">
              <button class="edit" @click="startEdit(contact.id)">Editar</button>
              <button class="delete" @click="deleteContact(contact.id)">Eliminar</button>
            </td>
          </tr>

          <!-- Linha do endereço + notas -->
          <tr v-if="editingContactId !== contact.id" class="contact-endereco">
            <td colspan="5">
              <!-- Endereço -->
              {{ contact.endereco ? `${contact.endereco.rua}, ${contact.endereco.cidade}, ${contact.endereco.pais}` : 'Sem endereço registado.' }}

              <!-- Notas -->
              <NoteList :contactId="contact.id" />
            </td>
          </tr>
        </template>
      </tbody>
    </table>
  </div>
</template>

<script>
import api from '../services/api'
import AddressForm from './AddressForm.vue'
import NoteList from './NoteList.vue'

export default {
  components: { AddressForm, NoteList },
  data() {
    return {
      contacts: [],
      editingContactId: null,
      categories: []
    }
  },
  mounted() {
    this.loadContacts()
    this.loadCategories()
  },
  methods: {
    async loadContacts() {
      try {
        const response = await api.get('contactos/')
        this.contacts = response.data
      } catch (error) {
        console.error('Erro ao carregar contactos', error)
      }
    },

    async loadCategories() {
      try {
        const response = await api.get('categorias/')
        this.categories = response.data
      } catch (err) {
        console.error('Erro ao carregar categorias', err)
      }
    },

    startEdit(id) {
      this.editingContactId = id
    },

    stopEdit() {
      this.editingContactId = null
    },

    async saveContact(id) {
      const contact = this.contacts.find(c => c.id === id)
      if (!contact) return

      try {
        const payload = {
          nome: contact.nome,
          telefone: contact.telefone,
          email: contact.email,
          categoria: contact.categoria
        }
        await api.put(`contactos/${id}/`, payload)
        alert('Contacto atualizado com sucesso!')
        this.editingContactId = null
        this.loadContacts()
      } catch (err) {
        console.error(err)
        alert('Erro ao atualizar contacto.')
      }
    },

    async deleteContact(id) {
      if (!confirm('Tem a certeza que deseja eliminar este contacto?')) return
      try {
        await api.delete(`contactos/${id}/`)
        this.loadContacts()
      } catch (error) {
        console.error('Erro ao eliminar contacto', error)
      }
    }
  }
}
</script>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
}

th {
  text-align: left;
  padding: 12px 10px;
  background-color: #f5f5f5;
}

th, td {
  padding: 12px 10px;
  vertical-align: middle;
}


.contact-row {
  border-bottom: 1px solid #ddd;
}


.contact-endereco {
  border-bottom: 4px solid #d9d8d8;
  background-color: #f9f9f9;
  padding: 10px;
}


.contact-endereco form {
  background: #fff;
  padding: 10px;
  border-radius: 4px;
  border: 1px solid #ccc;
  margin-bottom: 10px;
}

.actions {
  text-align: center;
  white-space: nowrap;
}

button {
  padding: 6px 12px;
  border-radius: 4px;
  cursor: pointer;
  border: none;
  color: rgb(12, 12, 12);
}

button.edit {
  background: #3498db;
  margin-right: 5px;
}

button.delete {
  background: #e74c3c;
}

form div {
  margin-bottom: 10px;
}

form label {
  display: inline-block;
  width: 80px;
}

form input,
form select {
  width: 300px;
  padding: 6px;
  border-radius: 4px;
  border: 1px solid #ccc;
}


tbody tr td form {
  background-color: #f9f9f9;
  padding: 10px;
  border-radius: 4px;
}


.contact-row:hover,
.contact-endereco:hover {
  background-color: #eef6fb;
  border-left: 4px solid #3498db;
  transition: background-color 0.2s ease-in-out, border-left 0.2s ease-in-out;
}
</style>