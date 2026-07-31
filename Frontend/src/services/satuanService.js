import api from './api'

export const getSatuan = (params) => api.get('/satuan', { params })
export const getSatuanAll = () => api.get('/satuan', { params: { page: 1, limit: 100 } })
export const createSatuan = (data) => api.post('/satuan', data)
export const updateSatuan = (id, data) => api.put(`/satuan/${id}`, data)
export const deleteSatuan = (id) => api.delete(`/satuan/${id}`)
