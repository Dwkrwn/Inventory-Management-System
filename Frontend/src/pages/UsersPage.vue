<script setup>
import { onMounted, ref, watch } from 'vue'
import { Plus, Search, Pencil, Ban, KeyRound } from '@lucide/vue'
import * as service from '../services/userService'
import { useToastStore } from '../stores/toastStore'
import { usePagination } from '../composables/usePagination'
import { useSearch } from '../composables/useSearch'
import BaseCard from '../components/base/BaseCard.vue'
import BaseInput from '../components/base/BaseInput.vue'
import BaseSelect from '../components/base/BaseSelect.vue'
import BaseButton from '../components/base/BaseButton.vue'
import BaseModal from '../components/base/BaseModal.vue'
import BasePagination from '../components/base/BasePagination.vue'
import BaseBadge from '../components/base/BaseBadge.vue'
import ConfirmDialog from '../components/base/ConfirmDialog.vue'
import LoadingSpinner from '../components/base/LoadingSpinner.vue'
import EmptyState from '../components/base/EmptyState.vue'

const toast = useToastStore()
const { search, debouncedSearch } = useSearch()
const pagination = usePagination()

const data = ref([])
const roles = ref([])
const loading = ref(true)
const saving = ref(false)

const modalOpen = ref(false)
const passwordOpen = ref(false)
const confirmDelete = ref(false)
const deleting = ref(false)
const selected = ref(null)
const errors = ref({})
const form = ref({ username: '', nama: '', no_hp: '', role_id: '', password: '', is_active: true })

const roleLabels = { admin: 'Admin Gudang', staff: 'Staff Gudang', owner: 'Owner' }

const load = async () => {
  loading.value = true
  try {
    const res = await service.getUsers({
      page: pagination.page.value,
      limit: pagination.limit.value,
      search: debouncedSearch.value,
    })
    data.value = res.data.data
    pagination.setPagination(res.data.pagination)
  } catch (err) {
    toast.danger(err.message)
  } finally {
    loading.value = false
  }
}

watch(debouncedSearch, () => {
  pagination.goTo(1)
  load()
})

const openCreate = () => {
  errors.value = {}
  form.value = { username: '', nama: '', no_hp: '', role_id: '', password: '', is_active: true }
  modalOpen.value = true
}

const openEdit = (item) => {
  errors.value = {}
  form.value = { username: item.username, nama: item.nama, no_hp: item.no_hp || '', role_id: item.role_id, password: '', is_active: item.is_active }
  selected.value = item
  modalOpen.value = true
}

const validate = () => {
  const e = {}
  if (!form.value.username.trim()) e.username = 'Username wajib diisi'
  if (!form.value.nama.trim()) e.nama = 'Nama wajib diisi'
  if (!form.value.role_id) e.role_id = 'Role wajib dipilih'
  if (!selected.value && (!form.value.password || form.value.password.length < 6)) {
    e.password = 'Password minimal 6 karakter'
  }
  errors.value = e
  return Object.keys(e).length === 0
}

const save = async () => {
  if (!validate()) return
  saving.value = true
  try {
    if (selected.value) {
      await service.updateUser(selected.value.id, {
        role_id: form.value.role_id,
        nama: form.value.nama,
        no_hp: form.value.no_hp,
        is_active: form.value.is_active,
      })
      toast.success('User berhasil diperbarui')
    } else {
      await service.createUser(form.value)
      toast.success('User berhasil ditambahkan')
    }
    modalOpen.value = false
    load()
  } catch (err) {
    toast.danger(err.message)
  } finally {
    saving.value = false
  }
}

const openResetPassword = (item) => {
  selected.value = item
  form.value.password = ''
  errors.value = {}
  passwordOpen.value = true
}

const doResetPassword = async () => {
  if (!form.value.password || form.value.password.length < 6) {
    errors.value.password = 'Password minimal 6 karakter'
    return
  }
  saving.value = true
  try {
    await service.resetPassword(selected.value.id, form.value.password)
    toast.success('Password berhasil direset')
    passwordOpen.value = false
  } catch (err) {
    toast.danger(err.message)
  } finally {
    saving.value = false
  }
}

const requestDelete = (item) => {
  selected.value = item
  confirmDelete.value = true
}

const doDelete = async () => {
  deleting.value = true
  try {
    await service.deleteUser(selected.value.id)
    toast.success('User berhasil dinonaktifkan')
    confirmDelete.value = false
    load()
  } catch (err) {
    toast.danger(err.message)
  } finally {
    deleting.value = false
  }
}

onMounted(async () => {
  const res = await service.getRoles()
  roles.value = res.data
  load()
})
</script>

<template>
  <div class="space-y-4">
    <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div class="relative sm:w-72">
        <Search class="pointer-events-none absolute top-2.5 left-3 h-4 w-4 text-slate-400" />
        <input v-model="search" class="input pl-9" placeholder="Cari user..." />
      </div>
      <BaseButton @click="openCreate">
        <Plus class="h-4 w-4" />
        Tambah User
      </BaseButton>
    </div>

    <BaseCard>
      <div class="overflow-x-auto">
        <table class="w-full min-w-[680px]">
          <thead>
            <tr class="border-b border-slate-200 dark:border-slate-700">
              <th class="th w-14">No</th>
              <th class="th">Username</th>
              <th class="th">Nama</th>
              <th class="th">Role</th>
              <th class="th">No. HP</th>
              <th class="th">Status</th>
              <th class="th w-40">Aksi</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="loading">
              <td colspan="7"><LoadingSpinner /></td>
            </tr>
            <tr v-else-if="data.length === 0">
              <td colspan="7"><EmptyState message="Belum ada data user." /></td>
            </tr>
            <tr v-for="(item, i) in data" v-else :key="item.id" class="border-b border-slate-100 last:border-0 dark:border-slate-800">
              <td class="td">{{ (pagination.page.value - 1) * pagination.limit.value + i + 1 }}</td>
              <td class="td font-mono text-xs">{{ item.username }}</td>
              <td class="td font-medium text-slate-900 dark:text-white">{{ item.nama }}</td>
              <td class="td">
                <BaseBadge type="info">{{ roleLabels[item.role] }}</BaseBadge>
              </td>
              <td class="td">{{ item.no_hp || '-' }}</td>
              <td class="td">
                <BaseBadge :type="item.is_active ? 'success' : 'neutral'">
                  {{ item.is_active ? 'Aktif' : 'Tidak Aktif' }}
                </BaseBadge>
              </td>
              <td class="td">
                <div class="flex items-center gap-1">
                  <button class="rounded-lg p-1.5 text-slate-500 transition hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800" title="Reset Password" @click="openResetPassword(item)">
                    <KeyRound class="h-4 w-4" />
                  </button>
                  <button class="rounded-lg p-1.5 text-blue-600 transition hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-900/20" title="Edit" @click="openEdit(item)">
                    <Pencil class="h-4 w-4" />
                  </button>
                  <button class="rounded-lg p-1.5 text-red-600 transition hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20" title="Nonaktifkan" @click="requestDelete(item)">
                    <Ban class="h-4 w-4" />
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div v-if="!loading && data.length > 0" class="border-t border-slate-200 p-4 dark:border-slate-800">
        <BasePagination
          :page="pagination.page.value"
          :total-pages="pagination.totalPages.value"
          :total="pagination.total.value"
          @change="(p) => { pagination.goTo(p); load() }"
        />
      </div>
    </BaseCard>

    <BaseModal v-if="modalOpen" :title="selected ? 'Edit User' : 'Tambah User'" @close="modalOpen = false">
      <form class="space-y-4" @submit.prevent="save">
        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <BaseInput v-model="form.username" label="Username" placeholder="contoh: staff2" :error="errors.username" :disabled="!!selected" />
          <BaseSelect v-model="form.role_id" label="Role" :options="roles" option-value="id" option-label="nama_role" :error="errors.role_id" />
        </div>
        <BaseInput v-model="form.nama" label="Nama" placeholder="Nama lengkap" :error="errors.nama" />
        <BaseInput v-model="form.no_hp" label="Nomor HP" placeholder="0812xxxx" />
        <div v-if="!selected" class="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <BaseInput v-model="form.password" label="Password" type="password" placeholder="Minimal 6 karakter" :error="errors.password" />
          <div>
            <label class="label">Status</label>
            <BaseSelect v-model="form.is_active" :options="[{ id: true, nama_role: 'Aktif' }, { id: false, nama_role: 'Tidak Aktif' }]" option-value="id" option-label="nama_role" />
          </div>
        </div>
        <div v-else>
          <label class="label">Status</label>
          <BaseSelect v-model="form.is_active" :options="[{ id: true, nama_role: 'Aktif' }, { id: false, nama_role: 'Tidak Aktif' }]" option-value="id" option-label="nama_role" />
        </div>
        <div class="flex justify-end gap-2 pt-2">
          <BaseButton type="button" variant="secondary" @click="modalOpen = false">Batal</BaseButton>
          <BaseButton type="submit" :loading="saving">Simpan</BaseButton>
        </div>
      </form>
    </BaseModal>

    <BaseModal v-if="passwordOpen" title="Reset Password" @close="passwordOpen = false">
      <form class="space-y-4" @submit.prevent="doResetPassword">
        <p class="text-sm text-slate-500 dark:text-slate-400">
          Atur ulang password untuk <strong class="text-slate-900 dark:text-white">{{ selected.username }}</strong>.
        </p>
        <BaseInput v-model="form.password" label="Password Baru" type="password" placeholder="Minimal 6 karakter" :error="errors.password" />
        <div class="flex justify-end gap-2 pt-2">
          <BaseButton type="button" variant="secondary" @click="passwordOpen = false">Batal</BaseButton>
          <BaseButton type="submit" :loading="saving">Simpan</BaseButton>
        </div>
      </form>
    </BaseModal>

    <ConfirmDialog
      v-if="confirmDelete"
      title="Nonaktifkan user?"
      :message="`User '${selected.username}' tidak dapat login lagi.`"
      confirm-text="Nonaktifkan"
      :loading="deleting"
      @confirm="doDelete"
      @cancel="confirmDelete = false"
    />
  </div>
</template>
