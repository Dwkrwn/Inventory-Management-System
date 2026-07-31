<script setup>
import { Loader2 } from '@lucide/vue'

defineProps({
  text: { type: String, default: 'Memuat data...' },
})
</script>

<template>
  <div class="flex flex-col items-center justify-center gap-3 py-12 text-slate-500 dark:text-slate-400">
    <Loader2 class="h-8 w-8 animate-spin text-blue-600 dark:text-blue-400" />
    <p class="text-sm">{{ text }}</p>
  </div>
</template>
