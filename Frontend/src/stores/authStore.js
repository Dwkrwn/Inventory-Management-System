import { defineStore } from 'pinia'
import * as authService from '../services/authService'

function parseUser(raw) {
  try {
    return JSON.parse(raw)
  } catch {
    return null
  }
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: parseUser(localStorage.getItem('user')),
    token: localStorage.getItem('token') || null,
  }),

  getters: {
    isLoggedIn: (state) => !!state.token,
    role: (state) => state.user?.role || null,
    isAdmin: (state) => state.user?.role === 'admin',
    isStaff: (state) => state.user?.role === 'staff',
    isOwner: (state) => state.user?.role === 'owner',
  },

  actions: {
    setSession(token, user) {
      this.token = token
      this.user = user
      localStorage.setItem('token', token)
      localStorage.setItem('user', JSON.stringify(user))
    },

    async login(username, password) {
      const res = await authService.login(username, password)
      this.setSession(res.data.token, res.data.user)
      return res.data.user
    },

    async fetchProfile() {
      const res = await authService.getProfile()
      this.user = { ...this.user, ...res.data }
      localStorage.setItem('user', JSON.stringify(this.user))
      return this.user
    },

    async logout() {
      try {
        await authService.logout()
      } catch {
        // abaikan error saat logout
      }
      this.user = null
      this.token = null
      localStorage.removeItem('token')
      localStorage.removeItem('user')
    },
  },
})
