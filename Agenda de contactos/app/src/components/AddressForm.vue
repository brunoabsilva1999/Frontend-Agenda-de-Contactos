<template>
  <div class="address-form">
    <h4>Endereço</h4>
    <form @submit.prevent="saveAddress">
      <div>
        <label>Rua:</label>
        <input v-model="localEndereco.rua" type="text" placeholder="Rua" />
      </div>
      <div>
        <label>Cidade:</label>
        <input v-model="localEndereco.cidade" type="text" placeholder="Cidade" />
      </div>
      <div>
        <label>País:</label>
        <input v-model="localEndereco.pais" type="text" placeholder="País" />
      </div>
      <button type="submit">{{ addressId ? 'Atualizar' : 'Criar' }}</button>
    </form>
  </div>
</template>

<script>
import { ref, watch } from 'vue'
import { updateAddress, createAddress } from '../services/api'

export default {
  props: {
    endereco: {
      type: Object,
      default: () => ({ rua: '', cidade: '', pais: '' })
    },
    addressId: {
      type: Number,
      default: null
    },
    contactId: {
      type: Number,
      required: true
    }
  },
  emits: ['address-updated'],
  setup(props, { emit }) {
    const localEndereco = ref({ ...props.endereco })

    // Atualiza localEndereco sempre que props.endereco mudar
    watch(
      () => props.endereco,
      (newVal) => {
        localEndereco.value = { ...newVal }
      },
      { immediate: true }
    )

    const saveAddress = async () => {
      try {
        if (props.addressId) {
          // Atualiza endereço existente
          await updateAddress(props.addressId, localEndereco.value)
        } else {
          // Cria novo endereço e associa ao contacto
          await createAddress({ ...localEndereco.value, contacto: props.contactId })
        }
        alert('Endereço salvo com sucesso!')
        emit('address-updated')
      } catch (err) {
        console.error(err)
        alert('Erro ao salvar endereço.')
      }
    }

    return {
      localEndereco,
      saveAddress
    }
  }
}
</script>

<style scoped>
.address-form {
  border: 1px solid #ccc;
  padding: 10px;
  border-radius: 4px;
  margin-top: 10px;
  background-color: #fdfdfd;
}

.address-form form div {
  margin-bottom: 8px;
}

.address-form label {
  display: inline-block;
  width: 70px;
}

.address-form input {
  width: 250px;
  padding: 5px;
  border: 1px solid #aaa;
  border-radius: 4px;
}

.address-form button {
  padding: 6px 12px;
  border-radius: 4px;
  border: none;
  background-color: #3498db;
  color: white;
  cursor: pointer;
}
</style>