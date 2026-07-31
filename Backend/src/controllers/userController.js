const { success, error } = require('../utils/responseHelper');
const { getPagination, getSort } = require('../utils/generate');
const userModel = require('../models/userModel');

const index = async (req, res, next) => {
  try {
    const search = req.query.search || '';
    const { page, limit, offset } = getPagination(req);
    const { sort, order } = getSort(req, ['id', 'username', 'nama']);

    const data = await userModel.findAll(search, { sort, order, limit, offset });
    const total = await userModel.countAll(search);

    return success(res, 'Data user berhasil diambil', {
      data,
      pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
    });
  } catch (err) {
    next(err);
  }
};

const show = async (req, res, next) => {
  try {
    const data = await userModel.findById(req.params.id);
    if (!data) return error(res, 'User tidak ditemukan', 404);
    return success(res, 'Detail user berhasil diambil', data);
  } catch (err) {
    next(err);
  }
};

const store = async (req, res, next) => {
  try {
    const bcrypt = require('bcrypt');

    const usernameExist = await userModel.findByUsername(req.body.username);
    if (usernameExist) return error(res, 'Username sudah digunakan', 409);

    const password = await bcrypt.hash(req.body.password, 10);
    const data = await userModel.create({ ...req.body, password }, req.user.id);

    return success(res, 'User berhasil ditambahkan', data, 201);
  } catch (err) {
    next(err);
  }
};

const update = async (req, res, next) => {
  try {
    const exists = await userModel.findById(req.params.id);
    if (!exists) return error(res, 'User tidak ditemukan', 404);

    const data = await userModel.update(req.params.id, req.body, req.user.id);
    return success(res, 'User berhasil diperbarui', data);
  } catch (err) {
    next(err);
  }
};

const resetPassword = async (req, res, next) => {
  try {
    const bcrypt = require('bcrypt');

    const exists = await userModel.findById(req.params.id);
    if (!exists) return error(res, 'User tidak ditemukan', 404);

    const password = await bcrypt.hash(req.body.password, 10);
    await userModel.updatePassword(req.params.id, password, req.user.id);

    return success(res, 'Password user berhasil direset', null);
  } catch (err) {
    next(err);
  }
};

const destroy = async (req, res, next) => {
  try {
    const exists = await userModel.findById(req.params.id);
    if (!exists) return error(res, 'User tidak ditemukan', 404);

    if (Number(req.params.id) === req.user.id) {
      return error(res, 'Tidak dapat menonaktifkan akun sendiri', 400);
    }

    const data = await userModel.softDelete(req.params.id, req.user.id);
    return success(res, 'User berhasil dinonaktifkan', data);
  } catch (err) {
    next(err);
  }
};

const roles = async (req, res, next) => {
  try {
    const data = await userModel.findAllRoles();
    return success(res, 'Daftar role berhasil diambil', data);
  } catch (err) {
    next(err);
  }
};

module.exports = { index, show, store, update, resetPassword, destroy, roles };
