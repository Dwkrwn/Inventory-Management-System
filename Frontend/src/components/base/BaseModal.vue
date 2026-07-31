<script setup>
import { X } from '@lucide/vue'

defineProps({
  title: String,
  width: { type: String, default: 'max-w-lg' },
})

const emit = defineEmits(['close'])
</script>

<template>
  <Teleport to="body">
    <div class="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div class="absolute inset-0 bg-slate-900/50 backdrop-blur-sm" @click="emit('close')" />

      <div class="card relative w-full max-h-[90vh] overflow-y-auto p-6" :class="width">
        <div class="mb-5 flex items-start justify-between gap-4">
          <h3 class="text-lg font-semibold text-slate-900 dark:text-white">{{ title }}</h3>
          <button
            class="rounded-lg p-1 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800"
            @click="emit('close')"
          >
            <X class="h-5 w-5" />
          </button>
        </div>
        <slot />
      </div>
    </div>
  </Teleport>
</template>
