<script setup>
import { onMounted, ref } from 'vue'
import { FileSearch, Printer } from '@lucide/vue'
import * as service from '../services/laporanService'
import * as barangService from '../services/barangService'
import * as supplierService from '../services/supplierService'
import * as kategoriService from '../services/kategoriService'
import { formatTanggal, formatRupiah } from '../utils/format'
import { useToastStore } from '../stores/toastStore'
import BaseCard from '../components/base/BaseCard.vue'
import BaseInput from '../components/base/BaseInput.vue'
import BaseSelect from '../components/base/BaseSelect.vue'
import BaseButton from '../components/base/BaseButton.vue'
import LoadingSpinner from '../components/base/LoadingSpinner.vue'
import EmptyState from '../components/base/EmptyState.vue'

const toast = useToastStore()
const tab = ref('masuk')

const data = ref([])
const loading = ref(false)

const barangList = ref([])
const supplierList = ref([])
const kategoriList = ref([])

const filters = ref({
  masuk: { tanggal_awal: '', tanggal_akhir: '', barang_id: '', supplier_id: '', kategori_id: '' },
  keluar: { tanggal_awal: '', tanggal_akhir: '', barang_id: '', supplier_id: '', kategori_id: '' },
  stok: { kategori_id: '', supplier_id: '', status: '' },
})

const totalQty = () => data.value.reduce((sum, d) => sum + Number(d.qty), 0)
const totalNominal = () => data.value.reduce((sum, d) => sum + Number(d.total || 0), 0)

const load = async () => {
  loading.value = true
  try {
    let res
    if (tab.value === 'masuk') {
      res = await service.getLaporanBarangMasuk(filters.value.masuk)
    } else if (tab.value === 'keluar') {
      res = await service.getLaporanBarangKeluar(filters.value.keluar)
    } else {
      res = await service.getLaporanStok(filters.value.stok)
    }
    data.value = res.data
  } catch (err) {
    toast.danger(err.message)
  } finally {
    loading.value = false
  }
}

const loadOptions = async () => {
  const [b, s, k] = await Promise.all([
    barangService.getBarangAll(),
    supplierService.getSupplierAll(),
    kategoriService.getKategoriAll(),
  ])
  barangList.value = b.data
  supplierList.value = s.data.data
  kategoriList.value = k.data.data
}

const reset = () => {
  const key = tab.value
  filters.value[key] =
    key === 'stok'
      ? { kategori_id: '', supplier_id: '', status: '' }
      : { tanggal_awal: '', tanggal_akhir: '', barang_id: '', supplier_id: '', kategori_id: '' }
  load()
}

const print = () => window.print()

const tabs = [
  { key: 'masuk', label: 'Barang Masuk' },
  { key: 'keluar', label: 'Barang Keluar' },
  { key: 'stok', label: 'Stok Barang' },
]

onMounted(async () => {
  await loadOptions()
  load()
})
</script>

<template>
  <div class="space-y-4">
    <div class="flex flex-wrap items-center justify-between gap-3">
      <div class="flex gap-2 rounded-lg bg-slate-100 p-1 dark:bg-slate-800">
        <button
          v-for="t in tabs"
          :key="t.key"
          class="rounded-md px-4 py-1.5 text-sm font-medium transition"
          :class="tab === t.key ? 'bg-white text-slate-900 shadow dark:bg-slate-700 dark:text-white' : 'text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200'"
          @click="tab = t.key; load()"
        >
          {{ t.label }}
        </button>
      </div>
      <BaseButton variant="secondary" size="sm" @click="print">
        <Printer class="h-4 w-4" />
        Cetak
      </BaseButton>
    </div>

    <BaseCard class="p-4">
      <div v-if="tab === 'masuk'" class="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
        <BaseInput v-model="filters.masuk.tanggal_awal" type="date" label="Tanggal Awal" />
        <BaseInput v-model="filters.masuk.tanggal_akhir" type="date" label="Tanggal Akhir" />
        <BaseSelect v-model="filters.masuk.barang_id" label="Barang" :options="barangList" option-value="id" option-label="nama_barang" />
        <BaseSelect v-model="filters.masuk.supplier_id" label="Supplier" :options="supplierList" option-value="id" option-label="nama_supplier" />
        <BaseSelect v-model="filters.masuk.kategori_id" label="Kategori" :options="kategoriList" option-value="id" option-label="nama_kategori" />
      </div>

      <div v-else-if="tab === 'keluar'" class="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
        <BaseInput v-model="filters.keluar.tanggal_awal" type="date" label="Tanggal Awal" />
        <BaseInput v-model="filters.keluar.tanggal_akhir" type="date" label="Tanggal Akhir" />
        <BaseSelect v-model="filters.keluar.barang_id" label="Barang" :options="barangList" option-value="id" option-label="nama_barang" />
        <BaseSelect v-model="filters.keluar.supplier_id" label="Supplier" :options="supplierList" option-value="id" option-label="nama_supplier" />
        <BaseSelect v-model="filters.keluar.kategori_id" label="Kategori" :options="kategoriList" option-value="id" option-label="nama_kategori" />
      </div>

      <div v-else class="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <BaseSelect v-model="filters.stok.kategori_id" label="Kategori" :options="kategoriList" option-value="id" option-label="nama_kategori" />
        <BaseSelect v-model="filters.stok.supplier_id" label="Supplier" :options="supplierList" option-value="id" option-label="nama_supplier" />
        <BaseSelect v-model="filters.stok.status" label="Status Stok" :options="[{ value: '', label: 'Semua' }, { value: 'menipis', label: 'Menipis' }, { value: 'aman', label: 'Aman' }]" option-value="value" option-label="label" />
      </div>

      <div class="mt-3 flex justify-end gap-2">
        <BaseButton variant="secondary" size="sm" @click="reset">
          <FileSearch class="h-4 w-4" />
          Reset
        </BaseButton>
        <BaseButton size="sm" @click="load">Tampilkan</BaseButton>
      </div>
    </BaseCard>

    <BaseCard>
      <div class="overflow-x-auto">
        <table v-if="tab === 'masuk'" class="w-full min-w-[900px]">
          <thead>
            <tr class="border-b border-slate-200 dark:border-slate-700">
              <th class="th">No. Transaksi</th>
              <th class="th">Tanggal</th>
              <th class="th">Supplier</th>
              <th class="th">Barang</th>
              <th class="th">Kategori</th>
              <th class="th text-right">Qty</th>
              <th class="th text-right">Harga Beli</th>
              <th class="th text-right">Total</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="loading"><td colspan="8"><LoadingSpinner /></td></tr>
            <tr v-else-if="data.length === 0">
              <td colspan="8"><EmptyState message="Belum ada data laporan." /></td>
            </tr>
            <tr v-for="(d, i) in data" v-else :key="i" class="border-b border-slate-100 last:border-0 dark:border-slate-800">
              <td class="td font-mono text-xs text-blue-600 dark:text-blue-400">{{ d.no_transaksi }}</td>
              <td class="td">{{ formatTanggal(d.tanggal) }}</td>
              <td class="td">{{ d.nama_supplier }}</td>
              <td class="td">
                <p class="font-medium text-slate-900 dark:text-white">{{ d.nama_barang }}</p>
                <p class="text-xs text-slate-400">{{ d.kode_barang }}</p>
              </td>
              <td class="td">{{ d.nama_kategori }}</td>
              <td class="td text-right tabular-nums">{{ d.qty }} {{ d.nama_satuan }}</td>
              <td class="td text-right tabular-nums">{{ formatRupiah(d.harga_beli) }}</td>
              <td class="td text-right font-medium tabular-nums text-slate-900 dark:text-white">{{ formatRupiah(d.total) }}</td>
            </tr>
          </tbody>
          <tfoot v-if="!loading && data.length > 0">
            <tr class="border-t-2 border-slate-200 dark:border-slate-700">
              <td colspan="5" class="td font-semibold">Total</td>
              <td class="td text-right font-semibold tabular-nums">{{ totalQty() }}</td>
              <td class="td"></td>
              <td class="td text-right font-semibold tabular-nums text-slate-900 dark:text-white">{{ formatRupiah(totalNominal()) }}</td>
            </tr>
          </tfoot>
        </table>

        <table v-else-if="tab === 'keluar'" class="w-full min-w-[900px]">
          <thead>
            <tr class="border-b border-slate-200 dark:border-slate-700">
              <th class="th">No. Transaksi</th>
              <th class="th">Tanggal</th>
              <th class="th">Tujuan</th>
              <th class="th">Barang</th>
              <th class="th">Kategori</th>
              <th class="th text-right">Qty</th>
              <th class="th text-right">Harga Jual</th>
              <th class="th text-right">Total</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="loading"><td colspan="8"><LoadingSpinner /></td></tr>
            <tr v-else-if="data.length === 0">
              <td colspan="8"><EmptyState message="Belum ada data laporan." /></td>
            </tr>
            <tr v-for="(d, i) in data" v-else :key="i" class="border-b border-slate-100 last:border-0 dark:border-slate-800">
              <td class="td font-mono text-xs text-blue-600 dark:text-blue-400">{{ d.no_transaksi }}</td>
              <td class="td">{{ formatTanggal(d.tanggal) }}</td>
              <td class="td">{{ d.nama_tujuan }}</td>
              <td class="td">
                <p class="font-medium text-slate-900 dark:text-white">{{ d.nama_barang }}</p>
                <p class="text-xs text-slate-400">{{ d.kode_barang }}</p>
              </td>
              <td class="td">{{ d.nama_kategori }}</td>
              <td class="td text-right tabular-nums">{{ d.qty }} {{ d.nama_satuan }}</td>
              <td class="td text-right tabular-nums">{{ formatRupiah(d.harga_jual) }}</td>
              <td class="td text-right font-medium tabular-nums text-slate-900 dark:text-white">{{ formatRupiah(d.total) }}</td>
            </tr>
          </tbody>
          <tfoot v-if="!loading && data.length > 0">
            <tr class="border-t-2 border-slate-200 dark:border-slate-700">
              <td colspan="5" class="td font-semibold">Total</td>
              <td class="td text-right font-semibold tabular-nums">{{ totalQty() }}</td>
              <td class="td"></td>
              <td class="td text-right font-semibold tabular-nums text-slate-900 dark:text-white">{{ formatRupiah(totalNominal()) }}</td>
            </tr>
          </tfoot>
        </table>

        <table v-else class="w-full min-w-[900px]">
          <thead>
            <tr class="border-b border-slate-200 dark:border-slate-700">
              <th class="th">Kode</th>
              <th class="th">Nama Barang</th>
              <th class="th">Kategori</th>
              <th class="th">Supplier</th>
              <th class="th text-right">Stok</th>
              <th class="th text-right">Min. Stok</th>
              <th class="th text-right">Harga Beli</th>
              <th class="th text-right">Harga Jual</th>
              <th class="th text-center">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="loading"><td colspan="9"><LoadingSpinner /></td></tr>
            <tr v-else-if="data.length === 0">
              <td colspan="9"><EmptyState message="Belum ada data laporan." /></td>
            </tr>
            <tr v-for="(d, i) in data" v-else :key="i" class="border-b border-slate-100 last:border-0 dark:border-slate-800">
              <td class="td font-mono text-xs text-slate-500 dark:text-slate-400">{{ d.kode_barang }}</td>
              <td class="td font-medium text-slate-900 dark:text-white">{{ d.nama_barang }}</td>
              <td class="td">{{ d.nama_kategori }}</td>
              <td class="td">{{ d.nama_supplier }}</td>
              <td class="td text-right tabular-nums">{{ d.stok }} {{ d.nama_satuan }}</td>
              <td class="td text-right tabular-nums">{{ d.min_stok }} {{ d.nama_satuan }}</td>
              <td class="td text-right tabular-nums">{{ formatRupiah(d.harga_beli) }}</td>
              <td class="td text-right tabular-nums">{{ formatRupiah(d.harga_jual) }}</td>
              <td class="td text-center">
                <span v-if="d.stok_menipis" class="inline-flex items-center gap-1 rounded-full bg-red-100 px-2 py-0.5 text-xs font-medium text-red-700 dark:bg-red-900/40 dark:text-red-300">Menipis</span>
                <span v-else class="inline-flex items-center gap-1 rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700 dark:bg-green-900/40 dark:text-green-300">Aman</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </BaseCard>
  </div>
</template>
