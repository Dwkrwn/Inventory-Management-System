const { success } = require('../utils/responseHelper');
const laporanModel = require('../models/laporanModel');

const getBarangMasuk = async (req, res, next) => {
  try {
    const filters = {
      tanggal_awal: req.query.tanggal_awal || null,
      tanggal_akhir: req.query.tanggal_akhir || null,
      barang_id: req.query.barang_id ? Number(req.query.barang_id) : null,
      supplier_id: req.query.supplier_id ? Number(req.query.supplier_id) : null,
      kategori_id: req.query.kategori_id ? Number(req.query.kategori_id) : null,
    };
    const data = await laporanModel.laporanBarangMasuk(filters);
    return success(res, 'Laporan barang masuk berhasil diambil', data);
  } catch (err) {
    next(err);
  }
};

const getBarangKeluar = async (req, res, next) => {
  try {
    const filters = {
      tanggal_awal: req.query.tanggal_awal || null,
      tanggal_akhir: req.query.tanggal_akhir || null,
      barang_id: req.query.barang_id ? Number(req.query.barang_id) : null,
      supplier_id: req.query.supplier_id ? Number(req.query.supplier_id) : null,
      kategori_id: req.query.kategori_id ? Number(req.query.kategori_id) : null,
    };
    const data = await laporanModel.laporanBarangKeluar(filters);
    return success(res, 'Laporan barang keluar berhasil diambil', data);
  } catch (err) {
    next(err);
  }
};

const getStok = async (req, res, next) => {
  try {
    const filters = {
      kategori_id: req.query.kategori_id ? Number(req.query.kategori_id) : null,
      supplier_id: req.query.supplier_id ? Number(req.query.supplier_id) : null,
      status: req.query.status || '',
    };
    const data = await laporanModel.laporanStok(filters);
    return success(res, 'Laporan stok barang berhasil diambil', data);
  } catch (err) {
    next(err);
  }
};

module.exports = { getBarangMasuk, getBarangKeluar, getStok };
