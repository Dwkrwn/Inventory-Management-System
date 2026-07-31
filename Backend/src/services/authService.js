const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const env = require('../config/env');
const authModel = require('../models/authModel');

const login = async (username, password) => {
  const user = await authModel.findByUsername(username);

  if (!user) {
    throw Object.assign(new Error('Username atau password salah'), { type: 'AuthError', status: 401 });
  }

  if (!user.is_active) {
    throw Object.assign(new Error('Akun Anda dinonaktifkan, hubungi admin'), { type: 'AuthError', status: 403 });
  }

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) {
    throw Object.assign(new Error('Username atau password salah'), { type: 'AuthError', status: 401 });
  }

  const token = jwt.sign(
    { id: user.id, username: user.username, role: user.role },
    env.jwt.secret,
    { expiresIn: env.jwt.expiresIn }
  );

  return {
    token,
    user: {
      id: user.id,
      username: user.username,
      nama: user.nama,
      no_hp: user.no_hp,
      role: user.role,
      role_id: user.role_id,
      theme: user.theme,
    },
  };
};

module.exports = { login };
