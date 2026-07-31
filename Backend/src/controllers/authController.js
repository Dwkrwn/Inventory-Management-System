const { success, error } = require('../utils/responseHelper');
const authService = require('../services/authService');
const authModel = require('../models/authModel');

const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const result = await authService.login(username, password);
    return success(res, 'Login berhasil', result);
  } catch (err) {
    if (err.type === 'AuthError') return error(res, err.message, err.status);
    next(err);
  }
};

const logout = (req, res) => {
  return success(res, 'Logout berhasil', null);
};

const getProfile = async (req, res, next) => {
  try {
    const user = await authModel.findById(req.user.id);
    if (!user) return error(res, 'User tidak ditemukan', 404);
    return success(res, 'Data profil berhasil diambil', user);
  } catch (err) {
    next(err);
  }
};

const updateProfile = async (req, res, next) => {
  try {
    const { nama, no_hp } = req.body;
    const user = await authModel.updateProfile(req.user.id, nama, no_hp);
    if (!user) return error(res, 'User tidak ditemukan', 404);
    return success(res, 'Profil berhasil diperbarui', user);
  } catch (err) {
    next(err);
  }
};

const changePassword = async (req, res, next) => {
  try {
    const bcrypt = require('bcrypt');
    const { password_lama, password_baru } = req.body;

    const user = await authModel.findPasswordById(req.user.id);
    if (!user) return error(res, 'User tidak ditemukan', 404);

    const valid = await bcrypt.compare(password_lama, user.password);
    if (!valid) return error(res, 'Password lama salah', 400);

    const hash = await bcrypt.hash(password_baru, 10);
    await authModel.updatePassword(req.user.id, hash);

    return success(res, 'Password berhasil diganti', null);
  } catch (err) {
    next(err);
  }
};

const updateTheme = async (req, res, next) => {
  try {
    const { theme } = req.body;
    if (!['light', 'dark'].includes(theme)) {
      return error(res, 'Tema hanya boleh light atau dark', 400);
    }
    const user = await authModel.updateTheme(req.user.id, theme);
    return success(res, 'Tema berhasil disimpan', user);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  login,
  logout,
  getProfile,
  updateProfile,
  changePassword,
  updateTheme,
};
