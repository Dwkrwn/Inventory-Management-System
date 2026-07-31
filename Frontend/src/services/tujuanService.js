import api from './api'

export const getTujuan = (params) => api.get('/tujuan-pengeluaran', { params })
export const getTujuanAll = () => api.get('/tujuan-pengeluaran', { params: { page: 1, limit: 100 } })
export const createTujuan = (data) => api.post('/tujuan-pengeluaran', data)
export const updateTujuan = (id, data) => api.put(`/tujuan-pengeluaran/${id}`, data)
export const deleteTujuan = (id) => api.delete(`/tujuan-pengeluaran/${id}`)
