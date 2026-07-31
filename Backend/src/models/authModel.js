const pool = require('../config/db');

const findByUsername = async (username) => {
  const { rows } = await pool.query(
    `SELECT u.id, u.username, u.password, u.nama, u.no_hp, u.theme, u.is_active,
            u.role_id, r.nama_role AS role
       FROM users u
       JOIN roles r ON r.id = u.role_id
      WHERE u.username = $1`,
    [username]
  );
  return rows[0] || null;
};

const findPasswordById = async (id) => {
  const { rows } = await pool.query(
    `SELECT id, password FROM users WHERE id = $1`,
    [id]
  );
  return rows[0] || null;
};

const findById = async (id) => {
  const { rows } = await pool.query(
    `SELECT u.id, u.username, u.nama, u.no_hp, u.theme, u.is_active,
            u.role_id, r.nama_role AS role
       FROM users u
       JOIN roles r ON r.id = u.role_id
      WHERE u.id = $1`,
    [id]
  );
  return rows[0] || null;
};

const updateProfile = async (id, nama, no_hp) => {
  const { rows } = await pool.query(
    `UPDATE users SET nama = $1, no_hp = $2, updated_at = NOW()
      WHERE id = $3
      RETURNING id, username, nama, no_hp, theme`,
    [nama, no_hp, id]
  );
  return rows[0] || null;
};

const updatePassword = async (id, password) => {
  await pool.query(
    `UPDATE users SET password = $1, updated_at = NOW() WHERE id = $2`,
    [password, id]
  );
};

const updateTheme = async (id, theme) => {
  const { rows } = await pool.query(
    `UPDATE users SET theme = $1, updated_at = NOW()
      WHERE id = $2
      RETURNING id, username, nama, theme`,
    [theme, id]
  );
  return rows[0] || null;
};

module.exports = {
  findByUsername,
  findPasswordById,
  findById,
  updateProfile,
  updatePassword,
  updateTheme,
};
