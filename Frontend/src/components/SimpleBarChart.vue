<script setup>
import { computed } from 'vue'
import { formatBulan } from '../utils/format'
import EmptyState from './base/EmptyState.vue'

const props = defineProps({
  data: { type: Array, default: () => [] },
  color: { type: String, default: '#2563eb' },
  height: { type: Number, default: 160 },
})

const max = computed(() => Math.max(...props.data.map((d) => d.total), 1))

const barHeight = (total) => Math.max((total / max.value) * 100, total > 0 ? 8 : 2)
</script>

<template>
  <div>
    <div v-if="data.length === 0">
      <EmptyState message="Belum ada data." />
    </div>
    <div v-else class="flex items-end gap-2" :style="{ height: `${height}px` }">
      <div v-for="(item, i) in data" :key="i" class="group flex h-full flex-1 flex-col justify-end gap-2">
        <div class="relative flex justify-center">
          <span
            class="pointer-events-none absolute -top-7 z-10 rounded bg-slate-900 px-2 py-0.5 text-xs text-white opacity-0 transition group-hover:opacity-100 dark:bg-slate-700"
          >
            {{ item.total }}
          </span>
          <div
            class="w-full max-w-10 rounded-t transition-all duration-500 hover:opacity-80"
            :style="{ height: `${barHeight(item.total)}%`, backgroundColor: color }"
          />
        </div>
        <p class="truncate text-center text-[10px] text-slate-400">{{ formatBulan(item.bulan) }}</p>
      </div>
    </div>
  </div>
</template>
