import api from './api'

export const getBarangKeluar = (params) => api.get('/barang-keluar', { params })
export const getBarangKeluarById = (id) => api.get(`/barang-keluar/${id}`)
export const createBarangKeluar = (data) => api.post('/barang-keluar', data)
