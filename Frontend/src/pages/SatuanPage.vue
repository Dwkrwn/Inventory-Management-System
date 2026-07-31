<script setup>
import { onMounted, ref, watch } from 'vue'
import { Plus, Search, Pencil, Ban, Eye } from '@lucide/vue'
import * as service from '../services/satuanService'
import { useAuthStore } from '../stores/authStore'
import { useToastStore } from '../stores/toastStore'
import { usePagination } from '../composables/usePagination'
import { useSearch } from '../composables/useSearch'
import BaseCard from '../components/base/BaseCard.vue'
import BaseInput from '../components/base/BaseInput.vue'
import BaseTextarea from '../components/base/BaseTextarea.vue'
import BaseButton from '../components/base/BaseButton.vue'
import BaseModal from '../components/base/BaseModal.vue'
import BasePagination from '../components/base/BasePagination.vue'
import BaseBadge from '../components/base/BaseBadge.vue'
import ConfirmDialog from '../components/base/ConfirmDialog.vue'
import LoadingSpinner from '../components/base/LoadingSpinner.vue'
import EmptyState from '../components/base/EmptyState.vue'

const auth = useAuthStore()
const toast = useToastStore()
const { search, debouncedSearch } = useSearch()
const pagination = usePagination()

const data = ref([])
const loading = ref(true)
const saving = ref(false)
const canEdit = auth.isAdmin

const modalOpen = ref(false)
const detailOpen = ref(false)
const confirmDelete = ref(false)
const deleting = ref(false)
const selected = ref(null)
const errors = ref({})
const form = ref({ nama_satuan: '', keterangan: '' })

const load = async () => {
  loading.value = true
  try {
    const res = await service.getSatuan({
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
  form.value = { nama_satuan: '', keterangan: '' }
  modalOpen.value = true
}

const openEdit = (item) => {
  errors.value = {}
  form.value = { nama_satuan: item.nama_satuan, keterangan: item.keterangan || '' }
  selected.value = item
  modalOpen.value = true
}

const openDetail = (item) => {
  selected.value = item
  detailOpen.value = true
}

const validate = () => {
  const e = {}
  if (!form.value.nama_satuan.trim()) e.nama_satuan = 'Nama satuan wajib diisi'
  errors.value = e
  return Object.keys(e).length === 0
}

const save = async () => {
  if (!validate()) return
  saving.value = true
  try {
    if (selected.value) {
      await service.updateSatuan(selected.value.id, form.value)
      toast.success('Satuan berhasil diperbarui')
    } else {
      await service.createSatuan(form.value)
      toast.success('Satuan berhasil ditambahkan')
    }
    modalOpen.value = false
    load()
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
    await service.deleteSatuan(selected.value.id)
    toast.success('Satuan berhasil dinonaktifkan')
    confirmDelete.value = false
    load()
  } catch (err) {
    toast.danger(err.message)
  } finally {
    deleting.value = false
  }
}

onMounted(load)
</script>

<template>
  <div class="space-y-4">
    <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div class="relative sm:w-72">
        <Search class="pointer-events-none absolute top-2.5 left-3 h-4 w-4 text-slate-400" />
        <input v-model="search" class="input pl-9" placeholder="Cari satuan..." />
      </div>
      <BaseButton v-if="canEdit" @click="openCreate">
        <Plus class="h-4 w-4" />
        Tambah Satuan
      </BaseButton>
    </div>

    <BaseCard>
      <div class="overflow-x-auto">
        <table class="w-full min-w-[520px]">
          <thead>
            <tr class="border-b border-slate-200 dark:border-slate-700">
              <th class="th w-14">No</th>
              <th class="th">Nama Satuan</th>
              <th class="th">Keterangan</th>
              <th class="th w-32">Aksi</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="loading">
              <td colspan="4"><LoadingSpinner /></td>
            </tr>
            <tr v-else-if="data.length === 0">
              <td colspan="4"><EmptyState message="Belum ada data satuan." /></td>
            </tr>
            <tr v-for="(item, i) in data" v-else :key="item.id" class="border-b border-slate-100 last:border-0 dark:border-slate-800">
              <td class="td">{{ (pagination.page.value - 1) * pagination.limit.value + i + 1 }}</td>
              <td class="td font-medium text-slate-900 dark:text-white">{{ item.nama_satuan }}</td>
              <td class="td">{{ item.keterangan || '-' }}</td>
              <td class="td">
                <div class="flex items-center gap-1">
                  <button class="rounded-lg p-1.5 text-slate-500 transition hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800" title="Detail" @click="openDetail(item)">
                    <Eye class="h-4 w-4" />
                  </button>
                  <button v-if="canEdit" class="rounded-lg p-1.5 text-blue-600 transition hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-900/20" title="Edit" @click="openEdit(item)">
                    <Pencil class="h-4 w-4" />
                  </button>
                  <button v-if="canEdit" class="rounded-lg p-1.5 text-red-600 transition hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20" title="Nonaktifkan" @click="requestDelete(item)">
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

    <BaseModal v-if="modalOpen" :title="selected ? 'Edit Satuan' : 'Tambah Satuan'" @close="modalOpen = false">
      <form class="space-y-4" @submit.prevent="save">
        <BaseInput v-model="form.nama_satuan" label="Nama Satuan" placeholder="contoh: PCS" :error="errors.nama_satuan" />
        <BaseTextarea v-model="form.keterangan" label="Keterangan" placeholder="Keterangan satuan" />
        <div class="flex justify-end gap-2 pt-2">
          <BaseButton type="button" variant="secondary" @click="modalOpen = false">Batal</BaseButton>
          <BaseButton type="submit" :loading="saving">Simpan</BaseButton>
        </div>
      </form>
    </BaseModal>

    <BaseModal v-if="detailOpen" title="Detail Satuan" @close="detailOpen = false">
      <dl class="space-y-3">
        <div>
          <dt class="label">Nama Satuan</dt>
          <dd class="text-sm text-slate-900 dark:text-white">{{ selected.nama_satuan }}</dd>
        </div>
        <div>
          <dt class="label">Keterangan</dt>
          <dd class="text-sm text-slate-900 dark:text-white">{{ selected.keterangan || '-' }}</dd>
        </div>
        <div>
          <dt class="label">Status</dt>
          <dd><BaseBadge type="success">Aktif</BaseBadge></dd>
        </div>
      </dl>
      <div class="flex justify-end pt-4">
        <BaseButton variant="secondary" @click="detailOpen = false">Tutup</BaseButton>
      </div>
    </BaseModal>

    <ConfirmDialog
      v-if="confirmDelete"
      title="Nonaktifkan satuan?"
      :message="`Satuan '${selected.nama_satuan}' tidak akan tampil lagi.`"
      confirm-text="Nonaktifkan"
      :loading="deleting"
      @confirm="doDelete"
      @cancel="confirmDelete = false"
    />
  </div>
</template>
