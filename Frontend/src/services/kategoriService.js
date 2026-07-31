import api from './api'

export const getKategori = (params) => api.get('/kategori', { params })
export const getKategoriAll = () => api.get('/kategori', { params: { page: 1, limit: 100 } })
export const createKategori = (data) => api.post('/kategori', data)
export const updateKategori = (id, data) => api.put(`/kategori/${id}`, data)
export const deleteKategori = (id) => api.delete(`/kategori/${id}`)
