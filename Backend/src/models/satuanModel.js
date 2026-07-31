const pool = require('../config/db');

const findAll = async (search = '', { sort, order, limit, offset }) => {
  const { rows } = await pool.query(
    `SELECT s.*
       FROM satuan s
      WHERE s.nama_satuan ILIKE '%' || $1 || '%'
      ORDER BY s.${sort} ${order}
      LIMIT $2 OFFSET $3`,
    [search, limit, offset]
  );
  return rows;
};

const countAll = async (search = '') => {
  const { rows } = await pool.query(
    `SELECT COUNT(*)::int AS total FROM satuan WHERE nama_satuan ILIKE '%' || $1 || '%'`,
    [search]
  );
  return rows[0].total;
};

const findById = async (id) => {
  const { rows } = await pool.query('SELECT * FROM satuan WHERE id = $1', [id]);
  return rows[0] || null;
};

const isUsedByBarang = async (id) => {
  const { rows } = await pool.query(
    `SELECT COUNT(*)::int AS total FROM barang WHERE satuan_id = $1 AND is_active = TRUE`,
    [id]
  );
  return rows[0].total > 0;
};

const create = async (data, userId) => {
  const { rows } = await pool.query(
    `INSERT INTO satuan (nama_satuan, keterangan, created_by, updated_by)
     VALUES ($1, $2, $3, $3) RETURNING *`,
    [data.nama_satuan, data.keterangan, userId]
  );
  return rows[0];
};

const update = async (id, data, userId) => {
  const { rows } = await pool.query(
    `UPDATE satuan SET nama_satuan = $1, keterangan = $2, updated_by = $3, updated_at = NOW()
      WHERE id = $4 RETURNING *`,
    [data.nama_satuan, data.keterangan, userId, id]
  );
  return rows[0];
};

const softDelete = async (id, userId) => {
  const { rows } = await pool.query(
    `UPDATE satuan SET is_active = FALSE, updated_by = $2, updated_at = NOW()
      WHERE id = $1 RETURNING *`,
    [id, userId]
  );
  return rows[0];
};

module.exports = { findAll, countAll, findById, isUsedByBarang, create, update, softDelete };
