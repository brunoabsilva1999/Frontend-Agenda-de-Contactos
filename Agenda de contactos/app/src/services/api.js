import axios from 'axios'

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/', 
})

// ----------------- CONTACTOS -----------------
export const getContacts = () => api.get('contactos/')
export const createContact = (contact) => api.post('contactos/', contact)
export const updateContact = (id, contact) => api.put(`contactos/${id}/`, contact)
export const deleteContact = (id) => api.delete(`contactos/${id}/`)

// ----------------- CATEGORIAS -----------------
export const getCategories = () => api.get('categorias/')

// ----------------- ENDEREÇOS -----------------
export const getAddresses = () => api.get('enderecos/')
export const createAddress = (address) => api.post('enderecos/', address)
export const updateAddress = (id, address) => api.put(`enderecos/${id}/`, address)
export const deleteAddress = (id) => api.delete(`enderecos/${id}/`)

// ----------------- NOTAS -----------------
export const getNotes = () => api.get('nota/')
export const createNote = (note) => api.post('nota/', note)
export const updateNote = (id, note) => api.put(`nota/${id}/`, note)
export const deleteNote = (id) => api.delete(`nota/${id}/`)

export default api