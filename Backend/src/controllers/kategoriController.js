const { success, error } = require('../utils/responseHelper');
const { getPagination, getSort } = require('../utils/generate');
const kategoriModel = require('../models/kategoriModel');

const index = async (req, res, next) => {
  try {
    const search = req.query.search || '';
    const { page, limit, offset } = getPagination(req);
    const { sort, order } = getSort(req, ['id', 'nama_kategori']);

    const data = await kategoriModel.findAll(search, { sort, order, limit, offset });
    const total = await kategoriModel.countAll(search);

    return success(res, 'Data kategori berhasil diambil', {
      data,
      pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
    });
  } catch (err) {
    next(err);
  }
};

const show = async (req, res, next) => {
  try {
    const data = await kategoriModel.findById(req.params.id);
    if (!data) return error(res, 'Kategori tidak ditemukan', 404);
    return success(res, 'Detail kategori berhasil diambil', data);
  } catch (err) {
    next(err);
  }
};

const store = async (req, res, next) => {
  try {
    const data = await kategoriModel.create(req.body, req.user.id);
    return success(res, 'Kategori berhasil ditambahkan', data, 201);
  } catch (err) {
    next(err);
  }
};

const update = async (req, res, next) => {
  try {
    const exists = await kategoriModel.findById(req.params.id);
    if (!exists) return error(res, 'Kategori tidak ditemukan', 404);

    const data = await kategoriModel.update(req.params.id, req.body, req.user.id);
    return success(res, 'Kategori berhasil diperbarui', data);
  } catch (err) {
    next(err);
  }
};

const destroy = async (req, res, next) => {
  try {
    const exists = await kategoriModel.findById(req.params.id);
    if (!exists) return error(res, 'Kategori tidak ditemukan', 404);

    const used = await kategoriModel.isUsedByBarang(req.params.id);
    if (used) return error(res, 'Kategori masih digunakan oleh barang, tidak dapat dinonaktifkan', 409);

    const data = await kategoriModel.softDelete(req.params.id, req.user.id);
    return success(res, 'Kategori berhasil dinonaktifkan', data);
  } catch (err) {
    next(err);
  }
};

module.exports = { index, show, store, update, destroy };
