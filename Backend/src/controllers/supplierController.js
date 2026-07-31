const { success, error } = require('../utils/responseHelper');
const { getPagination, getSort } = require('../utils/generate');
const supplierModel = require('../models/supplierModel');

const index = async (req, res, next) => {
  try {
    const search = req.query.search || '';
    const { page, limit, offset } = getPagination(req);
    const { sort, order } = getSort(req, ['id', 'nama_supplier']);

    const data = await supplierModel.findAll(search, { sort, order, limit, offset });
    const total = await supplierModel.countAll(search);

    return success(res, 'Data supplier berhasil diambil', {
      data,
      pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
    });
  } catch (err) {
    next(err);
  }
};

const show = async (req, res, next) => {
  try {
    const data = await supplierModel.findById(req.params.id);
    if (!data) return error(res, 'Supplier tidak ditemukan', 404);
    return success(res, 'Detail supplier berhasil diambil', data);
  } catch (err) {
    next(err);
  }
};

const store = async (req, res, next) => {
  try {
    const data = await supplierModel.create(req.body, req.user.id);
    return success(res, 'Supplier berhasil ditambahkan', data, 201);
  } catch (err) {
    next(err);
  }
};

const update = async (req, res, next) => {
  try {
    const exists = await supplierModel.findById(req.params.id);
    if (!exists) return error(res, 'Supplier tidak ditemukan', 404);

    const data = await supplierModel.update(req.params.id, req.body, req.user.id);
    return success(res, 'Supplier berhasil diperbarui', data);
  } catch (err) {
    next(err);
  }
};

const destroy = async (req, res, next) => {
  try {
    const exists = await supplierModel.findById(req.params.id);
    if (!exists) return error(res, 'Supplier tidak ditemukan', 404);

    const usedBarang = await supplierModel.isUsedByBarang(req.params.id);
    const usedTransaksi = await supplierModel.isUsedByTransaksi(req.params.id);
    if (usedBarang || usedTransaksi) {
      return error(res, 'Supplier masih digunakan oleh barang/transaksi, tidak dapat dinonaktifkan', 409);
    }

    const data = await supplierModel.softDelete(req.params.id, req.user.id);
    return success(res, 'Supplier berhasil dinonaktifkan', data);
  } catch (err) {
    next(err);
  }
};

module.exports = { index, show, store, update, destroy };
