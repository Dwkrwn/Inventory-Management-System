<script setup>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { Boxes, CheckCircle2 } from '@lucide/vue'
import { useAuthStore } from '../stores/authStore'
import { useThemeStore } from '../stores/themeStore'
import BaseInput from '../components/base/BaseInput.vue'
import BaseButton from '../components/base/BaseButton.vue'

const router = useRouter()
const route = useRoute()
const auth = useAuthStore()
const theme = useThemeStore()

const username = ref('')
const password = ref('')
const loading = ref(false)
const error = ref('')
const showPassword = ref(false)

const submit = async () => {
  error.value = ''
  loading.value = true

  try {
    await auth.login(username.value, password.value)
    theme.init()
    router.replace(route.query.redirect || '/dashboard')
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="flex min-h-screen">
    <div class="hidden w-1/2 flex-col justify-between bg-blue-700 p-10 text-white lg:flex">
      <div class="flex items-center gap-3">
        <div class="flex h-10 w-10 items-center justify-center rounded-xl bg-white/15">
          <Boxes class="h-6 w-6" />
        </div>
        <span class="text-lg font-semibold">Inventory Management</span>
      </div>

      <div>
        <h1 class="text-4xl font-bold leading-tight">
          Kelola stok gudang<br />dengan rapi dan akurat.
        </h1>
        <p class="mt-4 max-w-md text-blue-100">
          Pencatatan barang masuk, barang keluar, dan stok aktual dalam satu sistem yang mudah digunakan.
        </p>

        <ul class="mt-8 space-y-3">
          <li v-for="f in ['Barang masuk & keluar tercatat otomatis', 'Stok selalu aktual dan akurat', 'Laporan siap untuk evaluasi']" :key="f" class="flex items-center gap-2 text-sm text-blue-50">
            <CheckCircle2 class="h-5 w-5 shrink-0" />
            {{ f }}
          </li>
        </ul>
      </div>

      <p class="text-xs text-blue-200">© 2026 Inventory Management System</p>
    </div>

    <div class="flex w-full items-center justify-center bg-slate-100 p-6 lg:w-1/2 dark:bg-slate-950">
      <div class="w-full max-w-sm">
        <div class="mb-8 flex items-center justify-center gap-3 lg:hidden">
          <div class="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white">
            <Boxes class="h-6 w-6" />
          </div>
          <span class="text-lg font-semibold text-slate-900 dark:text-white">Inventory Management</span>
        </div>

        <h2 class="text-2xl font-bold text-slate-900 dark:text-white">Masuk ke aplikasi</h2>
        <p class="mt-1 text-sm text-slate-500 dark:text-slate-400">Gunakan akun Anda untuk melanjutkan.</p>

        <div v-if="error" class="mt-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700 dark:border-red-900 dark:bg-red-900/30 dark:text-red-300">
          {{ error }}
        </div>

        <form class="mt-6 space-y-4" @submit.prevent="submit">
          <BaseInput v-model="username" label="Username" placeholder="Masukkan username" autocomplete="username" />
          <div>
            <label class="label">Password</label>
            <div class="relative">
              <BaseInput
                v-model="password"
                :type="showPassword ? 'text' : 'password'"
                placeholder="Masukkan password"
                autocomplete="current-password"
              />
              <button
                type="button"
                class="absolute top-2.5 right-3 text-xs font-medium text-blue-600 hover:underline dark:text-blue-400"
                @click="showPassword = !showPassword"
              >
                {{ showPassword ? 'Sembunyikan' : 'Lihat' }}
              </button>
            </div>
          </div>

          <BaseButton type="submit" class="w-full" :loading="loading">Masuk</BaseButton>
        </form>

        <p class="mt-6 text-center text-xs text-slate-400 dark:text-slate-500">
          Akun demo: admin / staff / owner — password <span class="font-mono">admin123</span>
        </p>
      </div>
    </div>
  </div>
</template>
