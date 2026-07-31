import api from './api'

export const login = (username, password) => api.post('/login', { username, password })
export const logout = () => api.post('/logout')
export const getProfile = () => api.get('/profile')
export const updateProfile = (data) => api.put('/profile', data)
export const changePassword = (data) => api.put('/profile/password', data)
export const updateTheme = (theme) => api.put('/profile/theme', { theme })
