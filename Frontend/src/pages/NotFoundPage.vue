<script setup>
import { Home } from '@lucide/vue'
import BaseButton from '../components/base/BaseButton.vue'
import { useRouter } from 'vue-router'

const router = useRouter()
</script>

<template>
  <div class="flex min-h-full flex-col items-center justify-center py-16 text-center">
    <p class="text-7xl font-bold text-blue-600 dark:text-blue-400">404</p>
    <h1 class="mt-4 text-xl font-semibold text-slate-900 dark:text-white">Halaman Tidak Ditemukan</h1>
    <p class="mt-2 text-sm text-slate-500 dark:text-slate-400">Halaman yang Anda cari tidak ada atau telah dipindahkan.</p>
    <BaseButton class="mt-6" @click="router.push('/')">
      <Home class="h-4 w-4" />
      Kembali ke Dashboard
    </BaseButton>
  </div>
</template>
