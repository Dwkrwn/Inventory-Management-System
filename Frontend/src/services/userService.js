import api from './api'

export const getUsers = (params) => api.get('/users', { params })
export const getRoles = () => api.get('/users/roles')
export const createUser = (data) => api.post('/users', data)
export const updateUser = (id, data) => api.put(`/users/${id}`, data)
export const resetPassword = (id, password) => api.put(`/users/${id}/reset-password`, { password })
export const deleteUser = (id) => api.delete(`/users/${id}`)
