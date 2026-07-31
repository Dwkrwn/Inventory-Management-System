const { success, error } = require('../utils/responseHelper');
const { getPagination } = require('../utils/generate');
const barangMasukModel = require('../models/barangMasukModel');
const barangMasukService = require('../services/barangMasukService');

const index = async (req, res, next) => {
  try {
    const startDate = req.query.tanggal_awal || null;
    const endDate = req.query.tanggal_akhir || null;
    const supplierId = req.query.supplier_id ? Number(req.query.supplier_id) : null;
    const { page, limit, offset } = getPagination(req);

    const data = await barangMasukModel.findAll(startDate, endDate, supplierId, { limit, offset });
    const total = await barangMasukModel.countAll(startDate, endDate, supplierId);

    return success(res, 'Data barang masuk berhasil diambil', {
      data,
      pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
    });
  } catch (err) {
    next(err);
  }
};

const show = async (req, res, next) => {
  try {
    const header = await barangMasukModel.findById(req.params.id);
    if (!header) return error(res, 'Transaksi barang masuk tidak ditemukan', 404);

    const detail = await barangMasukModel.findDetails(req.params.id);
    return success(res, 'Detail transaksi barang masuk berhasil diambil', { ...header, detail });
  } catch (err) {
    next(err);
  }
};

const store = async (req, res, next) => {
  try {
    const data = await barangMasukService.createTransaksi(req.body, req.user.id);
    return success(res, 'Transaksi barang masuk berhasil disimpan', data, 201);
  } catch (err) {
    if (err.type === 'TransaksiError') return error(res, err.message, err.status);
    next(err);
  }
};

module.exports = { index, show, store };
