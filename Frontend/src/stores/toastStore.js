import { defineStore } from 'pinia'

let nextId = 0

export const useToastStore = defineStore('toast', {
  state: () => ({
    toasts: [],
  }),

  actions: {
    show(message, type = 'success', duration = 3500) {
      const id = ++nextId
      this.toasts.push({ id, message, type })
      setTimeout(() => this.remove(id), duration)
    },

    success(message) {
      this.show(message, 'success')
    },

    warning(message) {
      this.show(message, 'warning', 4500)
    },

    danger(message) {
      this.show(message, 'danger', 5000)
    },

    remove(id) {
      this.toasts = this.toasts.filter((t) => t.id !== id)
    },
  },
})
