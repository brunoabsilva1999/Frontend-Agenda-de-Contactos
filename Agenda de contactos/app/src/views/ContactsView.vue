<template>
  <div class="container">
    <ContactForm
      :selectedContact="selectedContact"
      @contact-saved="reloadContacts"
    />
    <ContactList
      ref="list"
      @edit-contact="selectContact"
    />
  </div>
</template>

<script>
import ContactForm from '../components/ContactForm.vue'
import ContactList from '../components/ContactList.vue'

export default {
  components: { ContactForm, ContactList },
  data() {
    return {
      selectedContact: null
    }
  },
  methods: {
    reloadContacts() {
      this.selectedContact = null
      this.$refs.list.loadContacts()
    },
    selectContact(contact) {
      this.selectedContact = contact
    }
  }
}
</script>

<style scoped>
.container {
  max-width: 900px;
  margin: 30px auto;
  padding: 20px;
  background: white;
  border-radius: 6px;
}
</style>