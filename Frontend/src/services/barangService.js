import api from './api'

export const getBarang = (params) => api.get('/barang', { params })
export const getBarangAll = () => api.get('/barang/all')
export const getBarangById = (id) => api.get(`/barang/${id}`)
export const createBarang = (data) => api.post('/barang', data)
export const updateBarang = (id, data) => api.put(`/barang/${id}`, data)
export const deleteBarang = (id) => api.delete(`/barang/${id}`)
