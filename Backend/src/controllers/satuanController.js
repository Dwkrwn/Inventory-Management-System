const { success, error } = require('../utils/responseHelper');
const { getPagination, getSort } = require('../utils/generate');
const satuanModel = require('../models/satuanModel');

const index = async (req, res, next) => {
  try {
    const search = req.query.search || '';
    const { page, limit, offset } = getPagination(req);
    const { sort, order } = getSort(req, ['id', 'nama_satuan']);

    const data = await satuanModel.findAll(search, { sort, order, limit, offset });
    const total = await satuanModel.countAll(search);

    return success(res, 'Data satuan berhasil diambil', {
      data,
      pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
    });
  } catch (err) {
    next(err);
  }
};

const show = async (req, res, next) => {
  try {
    const data = await satuanModel.findById(req.params.id);
    if (!data) return error(res, 'Satuan tidak ditemukan', 404);
    return success(res, 'Detail satuan berhasil diambil', data);
  } catch (err) {
    next(err);
  }
};

const store = async (req, res, next) => {
  try {
    const data = await satuanModel.create(req.body, req.user.id);
    return success(res, 'Satuan berhasil ditambahkan', data, 201);
  } catch (err) {
    next(err);
  }
};

const update = async (req, res, next) => {
  try {
    const exists = await satuanModel.findById(req.params.id);
    if (!exists) return error(res, 'Satuan tidak ditemukan', 404);

    const data = await satuanModel.update(req.params.id, req.body, req.user.id);
    return success(res, 'Satuan berhasil diperbarui', data);
  } catch (err) {
    next(err);
  }
};

const destroy = async (req, res, next) => {
  try {
    const exists = await satuanModel.findById(req.params.id);
    if (!exists) return error(res, 'Satuan tidak ditemukan', 404);

    const used = await satuanModel.isUsedByBarang(req.params.id);
    if (used) return error(res, 'Satuan masih digunakan oleh barang, tidak dapat dinonaktifkan', 409);

    const data = await satuanModel.softDelete(req.params.id, req.user.id);
    return success(res, 'Satuan berhasil dinonaktifkan', data);
  } catch (err) {
    next(err);
  }
};

module.exports = { index, show, store, update, destroy };
