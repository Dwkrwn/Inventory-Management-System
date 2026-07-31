const { success, error } = require('../utils/responseHelper');
const { getPagination, getSort } = require('../utils/generate');
const tujuanModel = require('../models/tujuanPengeluaranModel');

const index = async (req, res, next) => {
  try {
    const search = req.query.search || '';
    const { page, limit, offset } = getPagination(req);
    const { sort, order } = getSort(req, ['id', 'nama_tujuan']);

    const data = await tujuanModel.findAll(search, { sort, order, limit, offset });
    const total = await tujuanModel.countAll(search);

    return success(res, 'Data tujuan pengeluaran berhasil diambil', {
      data,
      pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
    });
  } catch (err) {
    next(err);
  }
};

const show = async (req, res, next) => {
  try {
    const data = await tujuanModel.findById(req.params.id);
    if (!data) return error(res, 'Tujuan pengeluaran tidak ditemukan', 404);
    return success(res, 'Detail tujuan pengeluaran berhasil diambil', data);
  } catch (err) {
    next(err);
  }
};

const store = async (req, res, next) => {
  try {
    const data = await tujuanModel.create(req.body, req.user.id);
    return success(res, 'Tujuan pengeluaran berhasil ditambahkan', data, 201);
  } catch (err) {
    next(err);
  }
};

const update = async (req, res, next) => {
  try {
    const exists = await tujuanModel.findById(req.params.id);
    if (!exists) return error(res, 'Tujuan pengeluaran tidak ditemukan', 404);

    const data = await tujuanModel.update(req.params.id, req.body, req.user.id);
    return success(res, 'Tujuan pengeluaran berhasil diperbarui', data);
  } catch (err) {
    next(err);
  }
};

const destroy = async (req, res, next) => {
  try {
    const exists = await tujuanModel.findById(req.params.id);
    if (!exists) return error(res, 'Tujuan pengeluaran tidak ditemukan', 404);

    const used = await tujuanModel.isUsedByTransaksi(req.params.id);
    if (used) return error(res, 'Tujuan masih digunakan oleh transaksi, tidak dapat dinonaktifkan', 409);

    const data = await tujuanModel.softDelete(req.params.id, req.user.id);
    return success(res, 'Tujuan pengeluaran berhasil dinonaktifkan', data);
  } catch (err) {
    next(err);
  }
};

module.exports = { index, show, store, update, destroy };
