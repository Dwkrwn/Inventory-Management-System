<script setup>
import { onMounted, ref } from 'vue'
import { Package, Truck, ArrowDownToLine, ArrowUpFromLine, AlertTriangle } from '@lucide/vue'
import * as service from '../services/dashboardService'
import { useToastStore } from '../stores/toastStore'
import BaseCard from '../components/base/BaseCard.vue'
import BaseBadge from '../components/base/BaseBadge.vue'
import StatCard from '../components/StatCard.vue'
import SimpleBarChart from '../components/SimpleBarChart.vue'
import LoadingSpinner from '../components/base/LoadingSpinner.vue'
import EmptyState from '../components/base/EmptyState.vue'

const toast = useToastStore()
const loading = ref(true)
const stats = ref({
  total_barang: 0,
  total_supplier: 0,
  barang_masuk_hari_ini: 0,
  barang_keluar_hari_ini: 0,
  jumlah_stok_menipis: 0,
  list_stok_menipis: [],
  grafik_masuk: [],
  grafik_keluar: [],
})

const last12Months = () => {
  const months = []
  const now = new Date()
  for (let i = 11; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1)
    months.push(`${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`)
  }
  return months
}

const fillMonths = (data) => {
  const map = Object.fromEntries(data.map((d) => [d.bulan, d.total]))
  return last12Months().map((bulan) => ({ bulan, total: map[bulan] || 0 }))
}

const load = async () => {
  loading.value = true
  try {
    const res = await service.getDashboard()
    stats.value = {
      ...res.data,
      grafik_masuk: fillMonths(res.data.grafik_masuk),
      grafik_keluar: fillMonths(res.data.grafik_keluar),
    }
  } catch (err) {
    toast.danger(err.message)
  } finally {
    loading.value = false
  }
}

onMounted(load)
</script>

<template>
  <div class="space-y-6">
    <LoadingSpinner v-if="loading" text="Memuat dashboard..." />

    <template v-else>
      <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Total Barang" :value="stats.total_barang" color="blue">
          <Package class="h-6 w-6" />
        </StatCard>
        <StatCard label="Total Supplier" :value="stats.total_supplier" color="green">
          <Truck class="h-6 w-6" />
        </StatCard>
        <StatCard label="Barang Masuk Hari Ini" :value="stats.barang_masuk_hari_ini" color="yellow">
          <ArrowDownToLine class="h-6 w-6" />
        </StatCard>
        <StatCard label="Barang Keluar Hari Ini" :value="stats.barang_keluar_hari_ini" color="red">
          <ArrowUpFromLine class="h-6 w-6" />
        </StatCard>
      </div>

      <div class="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <BaseCard class="p-5">
          <h3 class="mb-4 text-sm font-semibold text-slate-900 dark:text-white">Barang Masuk 12 Bulan Terakhir</h3>
          <SimpleBarChart :data="stats.grafik_masuk" color="#2563eb" />
        </BaseCard>
        <BaseCard class="p-5">
          <h3 class="mb-4 text-sm font-semibold text-slate-900 dark:text-white">Barang Keluar 12 Bulan Terakhir</h3>
          <SimpleBarChart :data="stats.grafik_keluar" color="#dc2626" />
        </BaseCard>
      </div>

      <BaseCard class="p-5">
        <div class="mb-4 flex items-center justify-between">
          <h3 class="text-sm font-semibold text-slate-900 dark:text-white">Stok Menipis</h3>
          <BaseBadge type="danger">{{ stats.jumlah_stok_menipis }} barang</BaseBadge>
        </div>
        <div class="overflow-x-auto">
          <table class="w-full min-w-640px">
            <thead>
              <tr class="border-b border-slate-200 dark:border-slate-700">
                <th class="th">Kode</th>
                <th class="th">Nama Barang</th>
                <th class="th">Kategori</th>
                <th class="th text-right">Stok</th>
                <th class="th text-right">Min. Stok</th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="stats.list_stok_menipis.length === 0">
                <td colspan="5"><EmptyState message="Tidak ada stok yang menipis. Bagus!" /></td>
              </tr>
              <tr v-for="item in stats.list_stok_menipis" :key="item.id" class="border-b border-slate-100 last:border-0 dark:border-slate-800">
                <td class="td font-mono text-xs text-slate-500 dark:text-slate-400">{{ item.kode_barang }}</td>
                <td class="td font-medium text-slate-900 dark:text-white">{{ item.nama_barang }}</td>
                <td class="td">{{ item.nama_kategori }}</td>
                <td class="td text-right">
                  <span class="inline-flex items-center gap-1 font-semibold tabular-nums text-red-600 dark:text-red-400">
                    <AlertTriangle class="h-3.5 w-3.5" />
                    {{ item.stok }} {{ item.nama_satuan }}
                  </span>
                </td>
                <td class="td text-right tabular-nums">{{ item.min_stok }} {{ item.nama_satuan }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </BaseCard>
    </template>
  </div>
</template>
