const { success, error } = require('../utils/responseHelper');
const { getPagination } = require('../utils/generate');
const barangKeluarModel = require('../models/barangKeluarModel');
const barangKeluarService = require('../services/barangKeluarService');

const index = async (req, res, next) => {
  try {
    const startDate = req.query.tanggal_awal || null;
    const endDate = req.query.tanggal_akhir || null;
    const tujuanId = req.query.tujuan_id ? Number(req.query.tujuan_id) : null;
    const { page, limit, offset } = getPagination(req);

    const data = await barangKeluarModel.findAll(startDate, endDate, tujuanId, { limit, offset });
    const total = await barangKeluarModel.countAll(startDate, endDate, tujuanId);

    return success(res, 'Data barang keluar berhasil diambil', {
      data,
      pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
    });
  } catch (err) {
    next(err);
  }
};

const show = async (req, res, next) => {
  try {
    const header = await barangKeluarModel.findById(req.params.id);
    if (!header) return error(res, 'Transaksi barang keluar tidak ditemukan', 404);

    const detail = await barangKeluarModel.findDetails(req.params.id);
    return success(res, 'Detail transaksi barang keluar berhasil diambil', { ...header, detail });
  } catch (err) {
    next(err);
  }
};

const store = async (req, res, next) => {
  try {
    const data = await barangKeluarService.createTransaksi(req.body, req.user.id);
    return success(res, 'Transaksi barang keluar berhasil disimpan', data, 201);
  } catch (err) {
    if (err.type === 'TransaksiError') return error(res, err.message, err.status);
    next(err);
  }
};

module.exports = { index, show, store };
