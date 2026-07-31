<script setup>
import { AlertTriangle } from '@lucide/vue'

defineProps({
  title: { type: String, default: 'Apakah Anda yakin?' },
  message: { type: String, default: '' },
  confirmText: { type: String, default: 'Ya, lanjutkan' },
  loading: Boolean,
})

const emit = defineEmits(['confirm', 'cancel'])
</script>

<template>
  <Teleport to="body">
    <div class="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div class="absolute inset-0 bg-slate-900/50 backdrop-blur-sm" @click="emit('cancel')" />

      <div class="card relative w-full max-w-sm p-6">
        <div class="flex items-start gap-4">
          <div class="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/40">
            <AlertTriangle class="h-6 w-6 text-red-600 dark:text-red-400" />
          </div>
          <div>
            <h3 class="text-base font-semibold text-slate-900 dark:text-white">{{ title }}</h3>
            <p v-if="message" class="mt-1 text-sm text-slate-500 dark:text-slate-400">{{ message }}</p>
          </div>
        </div>

        <div class="mt-6 flex justify-end gap-2">
          <button
            class="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
            :disabled="loading"
            @click="emit('cancel')"
          >
            Batal
          </button>
          <button
            class="inline-flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700 disabled:opacity-60"
            :disabled="loading"
            @click="emit('confirm')"
          >
            {{ loading ? 'Memproses...' : confirmText }}
          </button>
        </div>
      </div>
    </div>
  </Teleport>
</template>
