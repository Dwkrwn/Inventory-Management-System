<script setup>
import { ChevronLeft, ChevronRight } from '@lucide/vue'

const props = defineProps({
  page: { type: Number, required: true },
  totalPages: { type: Number, default: 1 },
  total: { type: Number, default: 0 },
})

const emit = defineEmits(['change'])

const pages = () => {
  const result = []
  const current = props.page
  const last = props.totalPages

  for (let p = 1; p <= last; p++) {
    if (p === 1 || p === last || Math.abs(p - current) <= 1) {
      result.push(p)
    } else if (result[result.length - 1] !== '...') {
      result.push('...')
    }
  }
  return result
}
</script>

<template>
  <div class="flex flex-col items-center justify-between gap-3 sm:flex-row">
    <p class="text-sm text-slate-500 dark:text-slate-400">
      Menampilkan {{ total === 0 ? 0 : (page - 1) * 10 + 1 }}–{{ Math.min(page * 10, total) }} dari {{ total }} data
    </p>

    <div class="flex items-center gap-1">
      <button
        class="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40 dark:text-slate-400 dark:hover:bg-slate-800"
        :disabled="page <= 1"
        @click="emit('change', page - 1)"
      >
        <ChevronLeft class="h-4 w-4" />
      </button>

      <button
        v-for="(p, i) in pages()"
        :key="i"
        class="min-w-8 rounded-lg px-2 py-1.5 text-sm font-medium transition"
        :class="
          p === page
            ? 'bg-blue-600 text-white'
            : p === '...'
              ? 'cursor-default text-slate-400'
              : 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800'
        "
        :disabled="p === '...'"
        @click="emit('change', p)"
      >
        {{ p }}
      </button>

      <button
        class="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40 dark:text-slate-400 dark:hover:bg-slate-800"
        :disabled="page >= totalPages"
        @click="emit('change', page + 1)"
      >
        <ChevronRight class="h-4 w-4" />
      </button>
    </div>
  </div>
</template>
