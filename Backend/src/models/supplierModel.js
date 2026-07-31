const pool = require('../config/db');

const findAll = async (search = '', { sort, order, limit, offset }) => {
  const { rows } = await pool.query(
    `SELECT s.*
       FROM supplier s
      WHERE s.nama_supplier ILIKE '%' || $1 || '%'
         OR s.nama_pic ILIKE '%' || $1 || '%'
      ORDER BY s.${sort} ${order}
      LIMIT $2 OFFSET $3`,
    [search, limit, offset]
  );
  return rows;
};

const countAll = async (search = '') => {
  const { rows } = await pool.query(
    `SELECT COUNT(*)::int AS total
       FROM supplier
      WHERE nama_supplier ILIKE '%' || $1 || '%'
         OR nama_pic ILIKE '%' || $1 || '%'`,
    [search]
  );
  return rows[0].total;
};

const findById = async (id) => {
  const { rows } = await pool.query('SELECT * FROM supplier WHERE id = $1', [id]);
  return rows[0] || null;
};

const isUsedByBarang = async (id) => {
  const { rows } = await pool.query(
    `SELECT COUNT(*)::int AS total FROM barang WHERE supplier_id = $1 AND is_active = TRUE`,
    [id]
  );
  return rows[0].total > 0;
};

const isUsedByTransaksi = async (id) => {
  const { rows } = await pool.query(
    `SELECT COUNT(*)::int AS total FROM barang_masuk WHERE supplier_id = $1`,
    [id]
  );
  return rows[0].total > 0;
};

const create = async (data, userId) => {
  const { rows } = await pool.query(
    `INSERT INTO supplier (nama_supplier, nama_pic, no_hp, email, alamat, created_by, updated_by)
     VALUES ($1, $2, $3, $4, $5, $6, $6) RETURNING *`,
    [data.nama_supplier, data.nama_pic, data.no_hp, data.email, data.alamat, userId]
  );
  return rows[0];
};

const update = async (id, data, userId) => {
  const { rows } = await pool.query(
    `UPDATE supplier
        SET nama_supplier = $1, nama_pic = $2, no_hp = $3, email = $4, alamat = $5,
            updated_by = $6, updated_at = NOW()
      WHERE id = $7 RETURNING *`,
    [data.nama_supplier, data.nama_pic, data.no_hp, data.email, data.alamat, userId, id]
  );
  return rows[0];
};

const softDelete = async (id, userId) => {
  const { rows } = await pool.query(
    `UPDATE supplier SET is_active = FALSE, updated_by = $2, updated_at = NOW()
      WHERE id = $1 RETURNING *`,
    [id, userId]
  );
  return rows[0];
};

module.exports = {
  findAll,
  countAll,
  findById,
  isUsedByBarang,
  isUsedByTransaksi,
  create,
  update,
  softDelete,
};
