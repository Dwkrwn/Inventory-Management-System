import { ref } from 'vue'

export function usePagination() {
  const page = ref(1)
  const limit = ref(10)
  const total = ref(0)
  const totalPages = ref(1)

  const setPagination = (data) => {
    page.value = data.page
    limit.value = data.limit
    total.value = data.total
    totalPages.value = data.totalPages || 1
  }

  const goTo = (p) => {
    if (p < 1 || p > totalPages.value) return
    page.value = p
  }

  const next = () => goTo(page.value + 1)
  const prev = () => goTo(page.value - 1)

  return { page, limit, total, totalPages, setPagination, goTo, next, prev }
}
