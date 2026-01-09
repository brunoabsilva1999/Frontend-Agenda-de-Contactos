<template>
  <div class="category-select">
    <!-- Label para indicar que é o campo de categoria -->
    <label for="category">Categoria</label>

    <select id="category" v-model="selected" @change="emitChange">
      <!-- Opção padrão -->
      <option value="" disabled>-- Escolha uma categoria --</option>

      <!-- Opções da API -->
      <option v-for="cat in categories" :key="cat.id" :value="cat.id">
        {{ cat.nome }}
      </option>
    </select>
  </div>
</template>

<script>
import { getCategories } from '../services/api'

export default {
  props: ['modelValue'], // recebe a categoria selecionada do ContactForm
  data() {
    return {
      categories: [],   // lista de categorias
      selected: this.modelValue
    }
  },
  mounted() {
    this.loadCategories()
  },
  methods: {
    async loadCategories() {
      try {
        const res = await getCategories()
        this.categories = res.data
      } catch (error) {
        console.error('Erro ao carregar categorias', error)
      }
    },
    emitChange() {
      // envia evento padrão do v-model
      this.$emit('update:modelValue', this.selected)
    }
  },
  watch: {
    modelValue(newVal) {
      this.selected = newVal
    }
  }
}
</script>

<style scoped>
.category-select {
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
}

.category-select label {
  font-weight: bold;
  margin-bottom: 5px;
}

.category-select select {
  padding: 8px 10px;
  border-radius: 4px;
  border: 1px solid #ccc;
}
</style>