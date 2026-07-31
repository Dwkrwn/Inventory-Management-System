<script setup>
defineProps({
  label: String,
  value: [Number, String],
  color: { type: String, default: 'blue' },
})

const colors = {
  blue: 'bg-blue-100 text-blue-600 dark:bg-blue-900/40 dark:text-blue-300',
  green: 'bg-green-100 text-green-600 dark:bg-green-900/40 dark:text-green-300',
  yellow: 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/40 dark:text-yellow-300',
  red: 'bg-red-100 text-red-600 dark:bg-red-900/40 dark:text-red-300',
}
</script>

<template>
  <div class="card flex items-center gap-4 p-5">
    <div class="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl" :class="colors[color]">
      <slot name="icon" />
    </div>
    <div class="min-w-0">
      <p class="text-sm text-slate-500 dark:text-slate-400">{{ label }}</p>
      <p class="text-2xl font-bold tabular-nums text-slate-900 dark:text-white">{{ value }}</p>
    </div>
  </div>
</template>
