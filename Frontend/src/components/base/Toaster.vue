<script setup>
import { CheckCircle2, AlertTriangle, XCircle } from '@lucide/vue'
import { useToastStore } from '../../stores/toastStore'

const toastStore = useToastStore()

const icons = {
  success: CheckCircle2,
  warning: AlertTriangle,
  danger: XCircle,
}

const colors = {
  success: 'text-green-500',
  warning: 'text-yellow-500',
  danger: 'text-red-500',
}
</script>

<template>
  <Teleport to="body">
    <div class="pointer-events-none fixed top-4 right-4 z-[60] flex w-full max-w-sm flex-col gap-2">
      <TransitionGroup name="toast">
        <div
          v-for="t in toastStore.toasts"
          :key="t.id"
          class="pointer-events-auto flex items-start gap-3 rounded-lg border border-slate-200 bg-white p-3 shadow-lg dark:border-slate-700 dark:bg-slate-900"
        >
          <component :is="icons[t.type]" class="mt-0.5 h-5 w-5 shrink-0" :class="colors[t.type]" />
          <p class="text-sm text-slate-700 dark:text-slate-200">{{ t.message }}</p>
        </div>
      </TransitionGroup>
    </div>
  </Teleport>
</template>

<style scoped>
.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s ease;
}
.toast-enter-from {
  opacity: 0;
  transform: translateX(20px);
}
.toast-leave-to {
  opacity: 0;
  transform: translateX(20px);
}
</style>
