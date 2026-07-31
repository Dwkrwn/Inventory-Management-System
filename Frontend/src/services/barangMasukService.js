import api from './api'

export const getBarangMasuk = (params) => api.get('/barang-masuk', { params })
export const getBarangMasukById = (id) => api.get(`/barang-masuk/${id}`)
export const createBarangMasuk = (data) => api.post('/barang-masuk', data)
