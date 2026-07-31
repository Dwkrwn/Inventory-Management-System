const express = require('express');
const pool = require('../config/db');
const { success, error } = require('../utils/responseHelper');
const authRoutes = require('./authRoutes');
const kategoriRoutes = require('./kategoriRoutes');
const supplierRoutes = require('./supplierRoutes');
const satuanRoutes = require('./satuanRoutes');
const tujuanRoutes = require('./tujuanPengeluaranRoutes');
const barangRoutes = require('./barangRoutes');
const userRoutes = require('./userRoutes');
const barangMasukRoutes = require('./barangMasukRoutes');
const barangKeluarRoutes = require('./barangKeluarRoutes');
const dashboardRoutes = require('./dashboardRoutes');
const laporanRoutes = require('./laporanRoutes');

const router = express.Router();

router.get('/health', async (req, res) => {
  try {
    await pool.query('SELECT 1');
    return success(res, 'Server dan database berjalan normal', {
      status: 'ok',
      database: 'connected',
    });
  } catch (err) {
    return error(res, 'Database tidak dapat terhubung', 500);
  }
});

router.use('/', authRoutes);
router.use('/kategori', kategoriRoutes);
router.use('/supplier', supplierRoutes);
router.use('/satuan', satuanRoutes);
router.use('/tujuan-pengeluaran', tujuanRoutes);
router.use('/barang', barangRoutes);
router.use('/users', userRoutes);
router.use('/barang-masuk', barangMasukRoutes);
router.use('/barang-keluar', barangKeluarRoutes);
router.use('/dashboard', dashboardRoutes);
router.use('/laporan', laporanRoutes);

module.exports = router;
