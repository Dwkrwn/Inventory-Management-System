import api from './api'

export const getSupplier = (params) => api.get('/supplier', { params })
export const getSupplierAll = () => api.get('/supplier', { params: { page: 1, limit: 100 } })
export const createSupplier = (data) => api.post('/supplier', data)
export const updateSupplier = (id, data) => api.put(`/supplier/${id}`, data)
export const deleteSupplier = (id) => api.delete(`/supplier/${id}`)
