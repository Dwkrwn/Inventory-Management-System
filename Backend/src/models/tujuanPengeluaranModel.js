const pool = require('../config/db');

const findAll = async (search = '', { sort, order, limit, offset }) => {
  const { rows } = await pool.query(
    `SELECT t.*
       FROM tujuan_pengeluaran t
      WHERE t.nama_tujuan ILIKE '%' || $1 || '%'
      ORDER BY t.${sort} ${order}
      LIMIT $2 OFFSET $3`,
    [search, limit, offset]
  );
  return rows;
};

const countAll = async (search = '') => {
  const { rows } = await pool.query(
    `SELECT COUNT(*)::int AS total FROM tujuan_pengeluaran WHERE nama_tujuan ILIKE '%' || $1 || '%'`,
    [search]
  );
  return rows[0].total;
};

const findById = async (id) => {
  const { rows } = await pool.query('SELECT * FROM tujuan_pengeluaran WHERE id = $1', [id]);
  return rows[0] || null;
};

const isUsedByTransaksi = async (id) => {
  const { rows } = await pool.query(
    `SELECT COUNT(*)::int AS total FROM barang_keluar WHERE tujuan_pengeluaran_id = $1`,
    [id]
  );
  return rows[0].total > 0;
};

const create = async (data, userId) => {
  const { rows } = await pool.query(
    `INSERT INTO tujuan_pengeluaran (nama_tujuan, keterangan, created_by, updated_by)
     VALUES ($1, $2, $3, $3) RETURNING *`,
    [data.nama_tujuan, data.keterangan, userId]
  );
  return rows[0];
};

const update = async (id, data, userId) => {
  const { rows } = await pool.query(
    `UPDATE tujuan_pengeluaran SET nama_tujuan = $1, keterangan = $2, updated_by = $3, updated_at = NOW()
      WHERE id = $4 RETURNING *`,
    [data.nama_tujuan, data.keterangan, userId, id]
  );
  return rows[0];
};

const softDelete = async (id, userId) => {
  const { rows } = await pool.query(
    `UPDATE tujuan_pengeluaran SET is_active = FALSE, updated_by = $2, updated_at = NOW()
      WHERE id = $1 RETURNING *`,
    [id, userId]
  );
  return rows[0];
};

module.exports = { findAll, countAll, findById, isUsedByTransaksi, create, update, softDelete };
