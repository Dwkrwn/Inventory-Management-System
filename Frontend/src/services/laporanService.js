import api from './api'

export const getLaporanBarangMasuk = (params) => api.get('/laporan/barang-masuk', { params })
export const getLaporanBarangKeluar = (params) => api.get('/laporan/barang-keluar', { params })
export const getLaporanStok = (params) => api.get('/laporan/stok', { params })
