<script setup>
import { onMounted, ref, watch } from 'vue'
import { Plus, Search, Eye, Trash2 } from '@lucide/vue'
import * as service from '../services/barangMasukService'
import * as barangService from '../services/barangService'
import * as supplierService from '../services/supplierService'
import { formatTanggal, formatRupiah } from '../utils/format'
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
import LoadingSpinner from '../components/base/LoadingSpinner.vue'
import EmptyState from '../components/base/EmptyState.vue'

const auth = useAuthStore()
const toast = useToastStore()
const { search, debouncedSearch } = useSearch()
const pagination = usePagination()

const data = ref([])
const loading = ref(true)
const saving = ref(false)
const canCreate = auth.isAdmin || auth.isStaff

const suppliers = ref([])
const barangList = ref([])

const formOpen = ref(false)
const detailOpen = ref(false)
const selected = ref(null)
const detailData = ref(null)
const errors = ref({})

const today = new Date().toISOString().split('T')[0]
const form = ref({
  tanggal: today,
  supplier_id: '',
  keterangan: '',
  rows: [{ barang_id: '', qty: 1, harga_beli: '' }],
})

const load = async () => {
  loading.value = true
  try {
    const res = await service.getBarangMasuk({
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

const loadOptions = async () => {
  const [s, b] = await Promise.all([supplierService.getSupplierAll(), barangService.getBarangAll()])
  suppliers.value = s.data.data
  barangList.value = b.data
}

const addRow = () => {
  form.value.rows.push({ barang_id: '', qty: 1, harga_beli: '' })
}

const removeRow = (index) => {
  if (form.value.rows.length === 1) return
  form.value.rows.splice(index, 1)
}

const onBarangChange = (row) => {
  const barang = barangList.value.find((b) => b.id === Number(row.barang_id))
  if (barang && row.harga_beli === '') {
    row.harga_beli = barang.harga_beli
  }
}

const findBarang = (id) => barangList.value.find((b) => b.id === Number(id))

const openCreate = () => {
  errors.value = {}
  form.value = {
    tanggal: today,
    supplier_id: '',
    keterangan: '',
    rows: [{ barang_id: '', qty: 1, harga_beli: '' }],
  }
  formOpen.value = true
}

const validate = () => {
  const e = {}
  if (!form.value.tanggal) e.tanggal = 'Tanggal wajib diisi'
  if (!form.value.supplier_id) e.supplier_id = 'Supplier wajib dipilih'

  const validRows = form.value.rows.filter((r) => r.barang_id && Number(r.qty) > 0)
  if (validRows.length === 0) e.rows = 'Minimal satu barang dengan jumlah lebih dari 0'

  errors.value = e
  return Object.keys(e).length === 0
}

const save = async () => {
  if (!validate()) return
  saving.value = true
  try {
    await service.createBarangMasuk({
      tanggal: form.value.tanggal,
      supplier_id: Number(form.value.supplier_id),
      keterangan: form.value.keterangan || null,
      detail: form.value.rows
        .filter((r) => r.barang_id && Number(r.qty) > 0)
        .map((r) => ({
          barang_id: Number(r.barang_id),
          qty: Number(r.qty),
          harga_beli: Number(r.harga_beli) || 0,
        })),
    })
    toast.success('Transaksi barang masuk berhasil disimpan')
    formOpen.value = false
    load()
  } catch (err) {
    toast.danger(err.message)
  } finally {
    saving.value = false
  }
}

const openDetail = async (item) => {
  selected.value = item
  detailOpen.value = true
  detailData.value = null
  try {
    const res = await service.getBarangMasukById(item.id)
    detailData.value = res.data
  } catch (err) {
    toast.danger(err.message)
  }
}

watch(debouncedSearch, () => {
  pagination.goTo(1)
  load()
})

onMounted(async () => {
  await loadOptions()
  load()
})
</script>

<template>
  <div class="space-y-4">
    <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div class="relative sm:w-72">
        <Search class="pointer-events-none absolute top-2.5 left-3 h-4 w-4 text-slate-400" />
        <input v-model="search" class="input pl-9" placeholder="Cari transaksi..." />
      </div>
      <BaseButton v-if="canCreate" @click="openCreate">
        <Plus class="h-4 w-4" />
        Transaksi Barang Masuk
      </BaseButton>
    </div>

    <BaseCard>
      <div class="overflow-x-auto">
        <table class="w-full min-w-[720px]">
          <thead>
            <tr class="border-b border-slate-200 dark:border-slate-700">
              <th class="th w-14">No</th>
              <th class="th">No. Transaksi</th>
              <th class="th">Tanggal</th>
              <th class="th">Supplier</th>
              <th class="th">Dibuat Oleh</th>
              <th class="th w-24">Aksi</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="loading">
              <td colspan="6"><LoadingSpinner /></td>
            </tr>
            <tr v-else-if="data.length === 0">
              <td colspan="6"><EmptyState message="Belum ada transaksi barang masuk." /></td>
            </tr>
            <tr v-for="(item, i) in data" v-else :key="item.id" class="border-b border-slate-100 last:border-0 dark:border-slate-800">
              <td class="td">{{ (pagination.page.value - 1) * pagination.limit.value + i + 1 }}</td>
              <td class="td font-mono text-xs font-medium text-blue-600 dark:text-blue-400">{{ item.no_transaksi }}</td>
              <td class="td">{{ formatTanggal(item.tanggal) }}</td>
              <td class="td">{{ item.nama_supplier }}</td>
              <td class="td">{{ item.created_by_name }}</td>
              <td class="td">
                <button class="rounded-lg p-1.5 text-slate-500 transition hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800" title="Detail" @click="openDetail(item)">
                  <Eye class="h-4 w-4" />
                </button>
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

    <BaseModal v-if="formOpen" title="Transaksi Barang Masuk" width="max-w-3xl" @close="formOpen = false">
      <form class="space-y-4" @submit.prevent="save">
        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <BaseInput v-model="form.tanggal" label="Tanggal" type="date" :error="errors.tanggal" />
          <BaseSelect v-model="form.supplier_id" label="Supplier" :options="suppliers" option-value="id" option-label="nama_supplier" :error="errors.supplier_id" />
        </div>

        <div>
          <div class="mb-2 flex items-center justify-between">
            <label class="label mb-0">Detail Barang</label>
            <BaseButton type="button" variant="secondary" size="sm" @click="addRow">
              <Plus class="h-4 w-4" />
              Tambah Baris
            </BaseButton>
          </div>

          <div class="overflow-x-auto rounded-lg border border-slate-200 dark:border-slate-700">
            <table class="w-full min-w-[600px]">
              <thead>
                <tr class="border-b border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-800/50">
                  <th class="th">Barang</th>
                  <th class="th w-24">Qty</th>
                  <th class="th w-40">Harga Beli</th>
                  <th class="th w-14"></th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(row, i) in form.rows" :key="i" class="border-b border-slate-100 last:border-0 dark:border-slate-800">
                  <td class="td">
                    <select v-model="row.barang_id" class="input" @change="onBarangChange(row)">
                      <option value="">Pilih barang...</option>
                      <option v-for="b in barangList" :key="b.id" :value="b.id">
                        {{ b.nama_barang }} ({{ b.nama_satuan }})
                      </option>
                    </select>
                  </td>
                  <td class="td">
                    <input v-model.number="row.qty" type="number" min="1" class="input" />
                  </td>
                  <td class="td">
                    <input v-model="row.harga_beli" type="number" min="0" class="input" />
                  </td>
                  <td class="td">
                    <button type="button" class="rounded-lg p-1.5 text-red-600 transition hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20" @click="removeRow(i)">
                      <Trash2 class="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <p v-if="errors.rows" class="mt-1 text-xs text-red-600 dark:text-red-400">{{ errors.rows }}</p>
        </div>

        <BaseTextarea v-model="form.keterangan" label="Keterangan" placeholder="Keterangan transaksi (opsional)" />

        <div class="flex justify-end gap-2 pt-2">
          <BaseButton type="button" variant="secondary" @click="formOpen = false">Batal</BaseButton>
          <BaseButton type="submit" :loading="saving">Simpan Transaksi</BaseButton>
        </div>
      </form>
    </BaseModal>

    <BaseModal v-if="detailOpen" :title="detailData?.no_transaksi || 'Detail Transaksi'" width="max-w-2xl" @close="detailOpen = false">
      <template v-if="detailData">
        <div class="mb-4 grid grid-cols-1 gap-3 rounded-lg bg-slate-50 p-4 sm:grid-cols-3 dark:bg-slate-800/50">
          <div>
            <dt class="label">Tanggal</dt>
            <dd class="text-sm text-slate-900 dark:text-white">{{ formatTanggal(detailData.tanggal) }}</dd>
          </div>
          <div>
            <dt class="label">Supplier</dt>
            <dd class="text-sm text-slate-900 dark:text-white">{{ detailData.nama_supplier }}</dd>
          </div>
          <div>
            <dt class="label">Dibuat Oleh</dt>
            <dd class="text-sm text-slate-900 dark:text-white">{{ detailData.created_by_name }}</dd>
          </div>
        </div>

        <div class="overflow-x-auto">
          <table class="w-full">
            <thead>
              <tr class="border-b border-slate-200 dark:border-slate-700">
                <th class="th">Barang</th>
                <th class="th text-right">Qty</th>
                <th class="th text-right">Harga Beli</th>
                <th class="th text-right">Total</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="d in detailData.detail" :key="d.id" class="border-b border-slate-100 last:border-0 dark:border-slate-800">
                <td class="td">
                  <p class="font-medium text-slate-900 dark:text-white">{{ d.nama_barang }}</p>
                  <p class="text-xs text-slate-400">{{ d.kode_barang }}</p>
                </td>
                <td class="td text-right tabular-nums">{{ d.qty }} {{ d.nama_satuan }}</td>
                <td class="td text-right tabular-nums">{{ formatRupiah(d.harga_beli) }}</td>
                <td class="td text-right font-medium tabular-nums text-slate-900 dark:text-white">{{ formatRupiah(d.qty * d.harga_beli) }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </template>
      <template v-else>
        <LoadingSpinner text="Memuat detail..." />
      </template>
      <div class="flex justify-end pt-4">
        <BaseButton variant="secondary" @click="detailOpen = false">Tutup</BaseButton>
      </div>
    </BaseModal>
  </div>
</template>
