<script setup>
import { Inbox } from '@lucide/vue'

defineProps({
  message: { type: String, default: 'Belum ada data.' },
})
</script>

<template>
  <div class="flex flex-col items-center justify-center gap-2 py-12 text-slate-400 dark:text-slate-500">
    <Inbox class="h-10 w-10" />
    <p class="text-sm">{{ message }}</p>
  </div>
</template>
