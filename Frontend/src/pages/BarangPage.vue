<script setup>
import { onMounted, ref, watch } from 'vue'
import { Plus, Search, Pencil, Ban, Eye, Package } from '@lucide/vue'
import * as service from '../services/barangService'
import * as kategoriService from '../services/kategoriService'
import * as supplierService from '../services/supplierService'
import * as satuanService from '../services/satuanService'
import { formatRupiah } from '../utils/format'
import { useAuthStore } from '../stores/authStore'
import { useToastStore } from '../stores/toastStore'
import { usePagination } from '../composables/usePagination'
import { useSearch } from '../composables/useSearch'
import BaseCard from '../components/base/BaseCard.vue'
import BaseInput from '../components/base/BaseInput.vue'
import BaseTextarea from '../components/base/BaseTextarea.vue'
import BaseSelect from '../components/base/BaseSelect.vue'
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

const kategoris = ref([])
const suppliers = ref([])
const satuans = ref([])
const filterKategori = ref('')
const filterSupplier = ref('')

const modalOpen = ref(false)
const detailOpen = ref(false)
const confirmDelete = ref(false)
const deleting = ref(false)
const selected = ref(null)
const errors = ref({})
const form = ref({
  nama_barang: '',
  kategori_id: '',
  supplier_id: '',
  satuan_id: '',
  harga_beli: '',
  harga_jual: '',
  min_stok: 0,
  deskripsi: '',
})

const loadOptions = async () => {
  const [k, s, u] = await Promise.all([
    kategoriService.getKategoriAll(),
    supplierService.getSupplierAll(),
    satuanService.getSatuanAll(),
  ])
  kategoris.value = k.data.data
  suppliers.value = s.data.data
  satuans.value = u.data.data
}

const load = async () => {
  loading.value = true
  try {
    const res = await service.getBarang({
      page: pagination.page.value,
      limit: pagination.limit.value,
      search: debouncedSearch.value,
      kategori: filterKategori.value || undefined,
      supplier: filterSupplier.value || undefined,
    })
    data.value = res.data.data
    pagination.setPagination(res.data.pagination)
  } catch (err) {
    toast.danger(err.message)
  } finally {
    loading.value = false
  }
}

watch([debouncedSearch, filterKategori, filterSupplier], () => {
  pagination.goTo(1)
  load()
})

const openCreate = () => {
  errors.value = {}
  form.value = {
    nama_barang: '',
    kategori_id: '',
    supplier_id: '',
    satuan_id: '',
    harga_beli: '',
    harga_jual: '',
    min_stok: 0,
    deskripsi: '',
  }
  modalOpen.value = true
}

const openEdit = (item) => {
  errors.value = {}
  form.value = {
    nama_barang: item.nama_barang,
    kategori_id: item.kategori_id,
    supplier_id: item.supplier_id,
    satuan_id: item.satuan_id,
    harga_beli: item.harga_beli,
    harga_jual: item.harga_jual,
    min_stok: item.min_stok,
    deskripsi: item.deskripsi || '',
  }
  selected.value = item
  modalOpen.value = true
}

const openDetail = (item) => {
  selected.value = item
  detailOpen.value = true
}

const validate = () => {
  const e = {}
  if (!form.value.nama_barang.trim()) e.nama_barang = 'Nama barang wajib diisi'
  if (!form.value.kategori_id) e.kategori_id = 'Kategori wajib dipilih'
  if (!form.value.supplier_id) e.supplier_id = 'Supplier wajib dipilih'
  if (!form.value.satuan_id) e.satuan_id = 'Satuan wajib dipilih'
  if (form.value.harga_beli !== '' && Number(form.value.harga_beli) < 0) e.harga_beli = 'Harga tidak boleh negatif'
  if (form.value.harga_jual !== '' && Number(form.value.harga_jual) < 0) e.harga_jual = 'Harga tidak boleh negatif'
  errors.value = e
  return Object.keys(e).length === 0
}

const save = async () => {
  if (!validate()) return
  saving.value = true
  try {
    const payload = {
      ...form.value,
      harga_beli: Number(form.value.harga_beli) || 0,
      harga_jual: Number(form.value.harga_jual) || 0,
      min_stok: Number(form.value.min_stok) || 0,
    }
    if (selected.value) {
      await service.updateBarang(selected.value.id, payload)
      toast.success('Barang berhasil diperbarui')
    } else {
      await service.createBarang(payload)
      toast.success('Barang berhasil ditambahkan')
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
    await service.deleteBarang(selected.value.id)
    toast.success('Barang berhasil dinonaktifkan')
    confirmDelete.value = false
    load()
  } catch (err) {
    toast.danger(err.message)
  } finally {
    deleting.value = false
  }
}

const isMenipis = (item) => item.min_stok > 0 && item.stok <= item.min_stok

onMounted(async () => {
  await loadOptions()
  load()
})
</script>

<template>
  <div class="space-y-4">
    <div class="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
      <div class="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div class="relative sm:w-64">
          <Search class="pointer-events-none absolute top-2.5 left-3 h-4 w-4 text-slate-400" />
          <input v-model="search" class="input pl-9" placeholder="Cari nama barang..." />
        </div>
        <BaseSelect v-model="filterKategori" :options="kategoris" option-value="id" option-label="nama_kategori" placeholder="Semua kategori" class="sm:w-48" />
        <BaseSelect v-model="filterSupplier" :options="suppliers" option-value="id" option-label="nama_supplier" placeholder="Semua supplier" class="sm:w-52" />
      </div>
      <BaseButton v-if="canEdit" @click="openCreate">
        <Plus class="h-4 w-4" />
        Tambah Barang
      </BaseButton>
    </div>

    <BaseCard>
      <div class="overflow-x-auto">
        <table class="w-full min-w-[900px]">
          <thead>
            <tr class="border-b border-slate-200 dark:border-slate-700">
              <th class="th w-14">No</th>
              <th class="th">Kode</th>
              <th class="th">Nama Barang</th>
              <th class="th">Kategori</th>
              <th class="th">Supplier</th>
              <th class="th text-right">Harga Jual</th>
              <th class="th text-right">Stok</th>
              <th class="th w-32">Aksi</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="loading">
              <td colspan="8"><LoadingSpinner /></td>
            </tr>
            <tr v-else-if="data.length === 0">
              <td colspan="8"><EmptyState message="Belum ada data barang." /></td>
            </tr>
            <tr v-for="(item, i) in data" v-else :key="item.id" class="border-b border-slate-100 last:border-0 dark:border-slate-800">
              <td class="td">{{ (pagination.page.value - 1) * pagination.limit.value + i + 1 }}</td>
              <td class="td font-mono text-xs">{{ item.kode_barang }}</td>
              <td class="td font-medium text-slate-900 dark:text-white">{{ item.nama_barang }}</td>
              <td class="td">{{ item.nama_kategori }}</td>
              <td class="td">{{ item.nama_supplier }}</td>
              <td class="td text-right tabular-nums">{{ formatRupiah(item.harga_jual) }}</td>
              <td class="td text-right">
                <div class="flex items-center justify-end gap-2">
                  <span class="tabular-nums">{{ item.stok }} {{ item.nama_satuan }}</span>
                  <BaseBadge v-if="isMenipis(item)" type="danger">Menipis</BaseBadge>
                </div>
              </td>
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

    <BaseModal v-if="modalOpen" :title="selected ? 'Edit Barang' : 'Tambah Barang'" width="max-w-2xl" @close="modalOpen = false">
      <form class="space-y-4" @submit.prevent="save">
        <BaseInput v-model="form.nama_barang" label="Nama Barang" placeholder="contoh: Laptop Acer" :error="errors.nama_barang" />
        <div class="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <BaseSelect v-model="form.kategori_id" label="Kategori" :options="kategoris" option-value="id" option-label="nama_kategori" :error="errors.kategori_id" />
          <BaseSelect v-model="form.supplier_id" label="Supplier" :options="suppliers" option-value="id" option-label="nama_supplier" :error="errors.supplier_id" />
          <BaseSelect v-model="form.satuan_id" label="Satuan" :options="satuans" option-value="id" option-label="nama_satuan" :error="errors.satuan_id" />
        </div>
        <div class="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <BaseInput v-model="form.harga_beli" label="Harga Beli" type="number" min="0" :error="errors.harga_beli" />
          <BaseInput v-model="form.harga_jual" label="Harga Jual" type="number" min="0" :error="errors.harga_jual" />
          <BaseInput v-model="form.min_stok" label="Stok Minimum" type="number" min="0" />
        </div>
        <BaseTextarea v-model="form.deskripsi" label="Deskripsi" placeholder="Deskripsi barang" />
        <div class="flex justify-end gap-2 pt-2">
          <BaseButton type="button" variant="secondary" @click="modalOpen = false">Batal</BaseButton>
          <BaseButton type="submit" :loading="saving">Simpan</BaseButton>
        </div>
      </form>
    </BaseModal>

    <BaseModal v-if="detailOpen" title="Detail Barang" width="max-w-xl" @close="detailOpen = false">
      <div class="mb-4 flex items-center gap-4 rounded-lg bg-slate-50 p-4 dark:bg-slate-800/50">
        <div class="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900/40">
          <Package class="h-6 w-6 text-blue-600 dark:text-blue-300" />
        </div>
        <div>
          <p class="font-semibold text-slate-900 dark:text-white">{{ selected.nama_barang }}</p>
          <p class="font-mono text-xs text-slate-500 dark:text-slate-400">{{ selected.kode_barang }}</p>
        </div>
      </div>

      <dl class="grid grid-cols-2 gap-4">
        <div>
          <dt class="label">Kategori</dt>
          <dd class="text-sm text-slate-900 dark:text-white">{{ selected.nama_kategori }}</dd>
        </div>
        <div>
          <dt class="label">Supplier</dt>
          <dd class="text-sm text-slate-900 dark:text-white">{{ selected.nama_supplier }}</dd>
        </div>
        <div>
          <dt class="label">Satuan</dt>
          <dd class="text-sm text-slate-900 dark:text-white">{{ selected.nama_satuan }}</dd>
        </div>
        <div>
          <dt class="label">Harga Beli</dt>
          <dd class="text-sm text-slate-900 dark:text-white">{{ formatRupiah(selected.harga_beli) }}</dd>
        </div>
        <div>
          <dt class="label">Harga Jual</dt>
          <dd class="text-sm text-slate-900 dark:text-white">{{ formatRupiah(selected.harga_jual) }}</dd>
        </div>
        <div>
          <dt class="label">Stok Saat Ini</dt>
          <dd class="flex items-center gap-2 text-sm text-slate-900 dark:text-white">
            <span class="tabular-nums">{{ selected.stok }} {{ selected.nama_satuan }}</span>
            <BaseBadge v-if="isMenipis(selected)" type="danger">Menipis</BaseBadge>
          </dd>
        </div>
        <div>
          <dt class="label">Stok Minimum</dt>
          <dd class="text-sm text-slate-900 dark:text-white">{{ selected.min_stok }} {{ selected.nama_satuan }}</dd>
        </div>
        <div>
          <dt class="label">Deskripsi</dt>
          <dd class="text-sm text-slate-900 dark:text-white">{{ selected.deskripsi || '-' }}</dd>
        </div>
      </dl>
      <div class="flex justify-end pt-4">
        <BaseButton variant="secondary" @click="detailOpen = false">Tutup</BaseButton>
      </div>
    </BaseModal>

    <ConfirmDialog
      v-if="confirmDelete"
      title="Nonaktifkan barang?"
      :message="`Barang '${selected.nama_barang}' tidak akan tampil lagi.`"
      confirm-text="Nonaktifkan"
      :loading="deleting"
      @confirm="doDelete"
      @cancel="confirmDelete = false"
    />
  </div>
</template>
