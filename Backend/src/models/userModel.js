const pool = require('../config/db');

const findAll = async (search = '', { sort, order, limit, offset }) => {
  const { rows } = await pool.query(
    `SELECT u.id, u.username, u.nama, u.no_hp, u.theme, u.is_active,
            r.nama_role AS role
       FROM users u
       JOIN roles r ON r.id = u.role_id
      WHERE u.username ILIKE '%' || $1 || '%'
         OR u.nama ILIKE '%' || $1 || '%'
      ORDER BY u.${sort} ${order}
      LIMIT $2 OFFSET $3`,
    [search, limit, offset]
  );
  return rows;
};

const countAll = async (search = '') => {
  const { rows } = await pool.query(
    `SELECT COUNT(*)::int AS total
       FROM users
      WHERE username ILIKE '%' || $1 || '%'
         OR nama ILIKE '%' || $1 || '%'`,
    [search]
  );
  return rows[0].total;
};

const findById = async (id) => {
  const { rows } = await pool.query(
    `SELECT u.id, u.username, u.nama, u.no_hp, u.theme, u.is_active,
            r.nama_role AS role
       FROM users u
       JOIN roles r ON r.id = u.role_id
      WHERE u.id = $1`,
    [id]
  );
  return rows[0] || null;
};

const findByUsername = async (username) => {
  const { rows } = await pool.query('SELECT id FROM users WHERE username = $1', [username]);
  return rows[0] || null;
};

const create = async (data, userId) => {
  const { rows } = await pool.query(
    `INSERT INTO users (role_id, username, password, nama, no_hp, theme, created_by, updated_by)
     VALUES ($1, $2, $3, $4, $5, 'light', $6, $6) RETURNING *`,
    [data.role_id, data.username, data.password, data.nama, data.no_hp, userId]
  );
  return rows[0];
};

const update = async (id, data, userId) => {
  const { rows } = await pool.query(
    `UPDATE users
        SET role_id = $1, nama = $2, no_hp = $3, is_active = $4,
            updated_by = $5, updated_at = NOW()
      WHERE id = $6 RETURNING *`,
    [data.role_id, data.nama, data.no_hp, data.is_active, userId, id]
  );
  return rows[0];
};

const updatePassword = async (id, password, userId) => {
  const { rows } = await pool.query(
    `UPDATE users SET password = $1, updated_by = $2, updated_at = NOW()
      WHERE id = $3 RETURNING *`,
    [password, userId, id]
  );
  return rows[0];
};

const softDelete = async (id, userId) => {
  const { rows } = await pool.query(
    `UPDATE users SET is_active = FALSE, updated_by = $2, updated_at = NOW()
      WHERE id = $1 RETURNING *`,
    [id, userId]
  );
  return rows[0];
};

const findAllRoles = async () => {
  const { rows } = await pool.query('SELECT id, nama_role FROM roles ORDER BY id');
  return rows;
};

module.exports = {
  findAll,
  countAll,
  findById,
  findByUsername,
  create,
  update,
  updatePassword,
  softDelete,
  findAllRoles,
};
