import { defineStore } from 'pinia'
import { useAuthStore } from './authStore'
import * as authService from '../services/authService'

export const useThemeStore = defineStore('theme', {
  state: () => ({
    theme: localStorage.getItem('theme') || 'light',
  }),

  getters: {
    isDark: (state) => state.theme === 'dark',
  },

  actions: {
    apply(theme) {
      this.theme = theme
      const root = document.documentElement
      if (theme === 'dark') {
        root.classList.add('dark')
      } else {
        root.classList.remove('dark')
      }
      localStorage.setItem('theme', theme)
    },

    init() {
      const auth = useAuthStore()
      this.apply(auth.user?.theme || this.theme)
    },

    async toggle() {
      const next = this.theme === 'dark' ? 'light' : 'dark'
      this.apply(next)

      try {
        await authService.updateTheme(next)
        const auth = useAuthStore()
        if (auth.user) {
          auth.user.theme = next
          localStorage.setItem('user', JSON.stringify(auth.user))
        }
      } catch {
        // simpan ke database gagal, tema tetap berubah secara lokal
      }
    },
  },
})
