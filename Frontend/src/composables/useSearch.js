import { ref, watch, onUnmounted } from 'vue'

export function useSearch(delay = 400) {
  const search = ref('')
  const debouncedSearch = ref('')
  let timer = null

  watch(search, (val) => {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      debouncedSearch.value = val
    }, delay)
  })

  onUnmounted(() => {
    if (timer) clearTimeout(timer)
  })

  return { search, debouncedSearch }
}
