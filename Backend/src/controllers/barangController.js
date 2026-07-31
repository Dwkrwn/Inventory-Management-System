const { success, error } = require('../utils/responseHelper');
const { getPagination, getSort } = require('../utils/generate');
const barangModel = require('../models/barangModel');
const barangService = require('../services/barangService');

const index = async (req, res, next) => {
  try {
    const search = req.query.search || '';
    const kategori = req.query.kategori ? Number(req.query.kategori) : null;
    const supplier = req.query.supplier ? Number(req.query.supplier) : null;
    const { page, limit, offset } = getPagination(req);
    const { sort, order } = getSort(req, ['id', 'nama_barang', 'kode_barang', 'stok']);

    const data = await barangModel.findAll({ search, kategori, supplier, sort, order, limit, offset });
    const total = await barangModel.countAll({ search, kategori, supplier });

    return success(res, 'Data barang berhasil diambil', {
      data,
      pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
    });
  } catch (err) {
    next(err);
  }
};

const show = async (req, res, next) => {
  try {
    const data = await barangModel.findById(req.params.id);
    if (!data) return error(res, 'Barang tidak ditemukan', 404);
    return success(res, 'Detail barang berhasil diambil', data);
  } catch (err) {
    next(err);
  }
};

const store = async (req, res, next) => {
  try {
    const data = await barangService.createBarang(req.body, req.user.id);
    return success(res, 'Barang berhasil ditambahkan', data, 201);
  } catch (err) {
    next(err);
  }
};

const update = async (req, res, next) => {
  try {
    const data = await barangService.updateBarang(req.params.id, req.body, req.user.id);
    if (!data) return error(res, 'Barang tidak ditemukan', 404);
    return success(res, 'Barang berhasil diperbarui', data);
  } catch (err) {
    next(err);
  }
};

const destroy = async (req, res, next) => {
  try {
    const exists = await barangModel.findById(req.params.id);
    if (!exists) return error(res, 'Barang tidak ditemukan', 404);

    const used = await barangModel.isUsedInTransaksi(req.params.id);
    if (used) return error(res, 'Barang sudah pernah digunakan dalam transaksi, tidak dapat dinonaktifkan', 409);

    const data = await barangModel.softDelete(req.params.id, req.user.id);
    return success(res, 'Barang berhasil dinonaktifkan', data);
  } catch (err) {
    next(err);
  }
};

const listSimple = async (req, res, next) => {
  try {
    const data = await barangModel.findAllSimple();
    return success(res, 'Daftar barang berhasil diambil', data);
  } catch (err) {
    next(err);
  }
};

module.exports = { index, show, store, update, destroy, listSimple };
