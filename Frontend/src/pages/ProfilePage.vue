<script setup>
import { computed, onMounted, ref } from 'vue'
import { KeyRound, UserRound, Shield } from '@lucide/vue'
import * as authService from '../services/authService'
import { useAuthStore } from '../stores/authStore'
import { useToastStore } from '../stores/toastStore'
import BaseCard from '../components/base/BaseCard.vue'
import BaseInput from '../components/base/BaseInput.vue'
import BaseButton from '../components/base/BaseButton.vue'
import BaseBadge from '../components/base/BaseBadge.vue'

const auth = useAuthStore()
const toast = useToastStore()

const roleLabels = { admin: 'Admin Gudang', staff: 'Staff Gudang', owner: 'Owner' }

const profile = ref({ nama: '', no_hp: '' })
const profileSaving = ref(false)
const profileErrors = ref({})

const password = ref({ password_lama: '', password_baru: '', konfirmasi: '' })
const passwordSaving = ref(false)
const passwordErrors = ref({})

const user = computed(() => auth.user)

const loadProfile = async () => {
  const res = await authService.getProfile()
  auth.user = { ...auth.user, ...res.data }
  localStorage.setItem('user', JSON.stringify(auth.user))
  profile.value = { nama: res.data.nama || '', no_hp: res.data.no_hp || '' }
}

const saveProfile = async () => {
  profileErrors.value = {}
  if (!profile.value.nama.trim()) {
    profileErrors.value.nama = 'Nama wajib diisi'
    return
  }
  profileSaving.value = true
  try {
    await authService.updateProfile({ nama: profile.value.nama, no_hp: profile.value.no_hp })
    await loadProfile()
    toast.success('Profil berhasil diperbarui')
  } catch (err) {
    toast.danger(err.message)
  } finally {
    profileSaving.value = false
  }
}

const savePassword = async () => {
  passwordErrors.value = {}
  const e = {}
  if (!password.value.password_lama) e.password_lama = 'Password lama wajib diisi'
  if (!password.value.password_baru) e.password_baru = 'Password baru wajib diisi'
  else if (password.value.password_baru.length < 6) e.password_baru = 'Password minimal 6 karakter'
  if (password.value.konfirmasi !== password.value.password_baru) e.konfirmasi = 'Konfirmasi tidak cocok'

  if (Object.keys(e).length > 0) {
    passwordErrors.value = e
    return
  }

  passwordSaving.value = true
  try {
    await authService.changePassword({
      password_lama: password.value.password_lama,
      password_baru: password.value.password_baru,
    })
    password.value = { password_lama: '', password_baru: '', konfirmasi: '' }
    toast.success('Password berhasil diganti')
  } catch (err) {
    toast.danger(err.message)
  } finally {
    passwordSaving.value = false
  }
}

onMounted(loadProfile)
</script>

<template>
  <div class="mx-auto max-w-2xl space-y-6">
    <BaseCard class="p-6">
      <div class="mb-6 flex items-center gap-4">
        <div class="flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 font-bold text-white">
          {{ (user?.nama || '?').charAt(0).toUpperCase() }}
        </div>
        <div>
          <h2 class="text-lg font-semibold text-slate-900 dark:text-white">{{ user?.nama }}</h2>
          <p class="text-sm text-slate-500 dark:text-slate-400">@{{ user?.username }}</p>
        </div>
        <div class="ml-auto">
          <BaseBadge type="info">
            <Shield class="mr-1 inline h-3 w-3" />
            {{ roleLabels[user?.role] || user?.role }}
          </BaseBadge>
        </div>
      </div>

      <h3 class="mb-4 flex items-center gap-2 text-sm font-semibold text-slate-900 dark:text-white">
        <UserRound class="h-4 w-4" />
        Data Profil
      </h3>
      <form class="space-y-4" @submit.prevent="saveProfile">
        <BaseInput v-model="profile.nama" label="Nama Lengkap" :error="profileErrors.nama" />
        <BaseInput v-model="profile.no_hp" label="No. Handphone" placeholder="08xxxxxxxxxx" :error="profileErrors.no_hp" />
        <div class="flex justify-end">
          <BaseButton type="submit" :loading="profileSaving">Simpan Profil</BaseButton>
        </div>
      </form>
    </BaseCard>

    <BaseCard class="p-6">
      <h3 class="mb-4 flex items-center gap-2 text-sm font-semibold text-slate-900 dark:text-white">
        <KeyRound class="h-4 w-4" />
        Ganti Password
      </h3>
      <form class="space-y-4" @submit.prevent="savePassword">
        <BaseInput v-model="password.password_lama" type="password" label="Password Lama" :error="passwordErrors.password_lama" />
        <BaseInput v-model="password.password_baru" type="password" label="Password Baru" :error="passwordErrors.password_baru" />
        <BaseInput v-model="password.konfirmasi" type="password" label="Konfirmasi Password Baru" :error="passwordErrors.konfirmasi" />
        <div class="flex justify-end">
          <BaseButton type="submit" variant="danger" :loading="passwordSaving">Ganti Password</BaseButton>
        </div>
      </form>
    </BaseCard>
  </div>
</template>
