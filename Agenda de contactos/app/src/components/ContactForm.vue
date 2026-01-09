<template>
  <form class="form" @submit.prevent="submitForm">
    <h2>{{ contact.id ? 'Editar Contacto' : 'Novo Contacto' }}</h2>

    <input
      type="text"
      placeholder="Nome *"
      v-model="contact.nome"
      required
    />

    <input
      type="text"
      placeholder="Telefone *"
      v-model="contact.telefone"
      required
    />

    <input
      type="email"
      placeholder="Email"
      v-model="contact.email"
    />

    <CategorySelect v-model="contact.categoria" />

    <!-- Endereço -->
    <h3>Endereço</h3>
    <input
      type="text"
      placeholder="Rua"
      v-model="localEndereco.rua"
    />
    <input
      type="text"
      placeholder="Cidade"
      v-model="localEndereco.cidade"
    />
    <input
      type="text"
      placeholder="País"
      v-model="localEndereco.pais"
    />

    <p v-if="error" class="error">
      Nome e Telefone são obrigatórios.
    </p>

    <button type="submit">Guardar</button>
  </form>
</template>

<script>
import api from '../services/api'
import CategorySelect from './CategorySelect.vue'  

export default {
  props: {
    selectedContact: {
      type: Object,
      default: null
    }
  },
  components: { CategorySelect },
  data() {
    return {
      contact: {
        nome: '',
        telefone: '',
        email: '',
        categoria: null   
      },
      localEndereco: {
        rua: '',
        cidade: '',
        pais: ''
      },
      error: false
    }
  },
  watch: {
    selectedContact: {
      immediate: true,
      handler(contact) {
        if (contact) {
          this.contact = { ...contact }
          this.localEndereco = contact.endereco
            ? { ...contact.endereco }
            : { rua: '', cidade: '', pais: '' }
        }
      }
    }
  },
  methods: {
    async submitForm() {
      if (!this.contact.nome || !this.contact.telefone) {
        this.error = true
        return
      }

      try {
        let contactId = this.contact.id

        if (contactId) {
          // EDITAR CONTACTO
          await api.put(`contactos/${contactId}/`, this.contact)
        } else {
          // CRIAR CONTACTO
          const res = await api.post('contactos/', this.contact)
          contactId = res.data.id
        }

        // Criar ou atualizar endereço
        if (this.localEndereco.rua || this.localEndereco.cidade || this.localEndereco.pais) {
          if (this.localEndereco.id) {
            // UPDATE
            await api.put(`enderecos/${this.localEndereco.id}/`, {
              ...this.localEndereco,
              contacto: contactId
            })
          } else {
            // CREATE
            await api.post('enderecos/', {
              ...this.localEndereco,
              contacto: contactId
            })
          }
        }

        this.resetForm()
        this.$emit('contact-saved')
      } catch (error) {
        console.error('Erro ao guardar contacto/endereço', error)
      }
    },
    resetForm() {
      this.contact = { nome: '', telefone: '', email: '', categoria: null }
      this.localEndereco = { rua: '', cidade: '', pais: '' }
      this.error = false
    }
  }
}
</script>

<style scoped>
.form {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

input {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.error {
  color: #e74c3c;
  font-size: 14px;
}

button {
  background-color: #2c3e50;
  color: white;
  border: none;
  padding: 10px;
  cursor: pointer;
}
</style>