const pool = require('../config/db');

const findAll = async (startDate = null, endDate = null, supplierId = null, { limit, offset }) => {
  const { rows } = await pool.query(
    `SELECT bm.id, bm.no_transaksi, bm.tanggal, bm.keterangan,
            s.id AS supplier_id, s.nama_supplier,
            u.id AS user_id, u.nama AS created_by_name
       FROM barang_masuk bm
       JOIN supplier s ON s.id = bm.supplier_id
       JOIN users u ON u.id = bm.user_id
      WHERE ($1::date IS NULL OR bm.tanggal >= $1)
        AND ($2::date IS NULL OR bm.tanggal <= $2)
        AND ($3::int IS NULL OR bm.supplier_id = $3)
      ORDER BY bm.tanggal DESC, bm.id DESC
      LIMIT $4 OFFSET $5`,
    [startDate, endDate, supplierId, limit, offset]
  );
  return rows;
};

const countAll = async (startDate = null, endDate = null, supplierId = null) => {
  const { rows } = await pool.query(
    `SELECT COUNT(*)::int AS total
       FROM barang_masuk bm
      WHERE ($1::date IS NULL OR bm.tanggal >= $1)
        AND ($2::date IS NULL OR bm.tanggal <= $2)
        AND ($3::int IS NULL OR bm.supplier_id = $3)`,
    [startDate, endDate, supplierId]
  );
  return rows[0].total;
};

const findById = async (id) => {
  const { rows } = await pool.query(
    `SELECT bm.id, bm.no_transaksi, bm.tanggal, bm.keterangan, bm.created_at,
            s.id AS supplier_id, s.nama_supplier,
            u.id AS user_id, u.nama AS created_by_name
       FROM barang_masuk bm
       JOIN supplier s ON s.id = bm.supplier_id
       JOIN users u ON u.id = bm.user_id
      WHERE bm.id = $1`,
    [id]
  );
  return rows[0] || null;
};

const findDetails = async (id) => {
  const { rows } = await pool.query(
    `SELECT d.id, d.qty, d.harga_beli,
            b.id AS barang_id, b.kode_barang, b.nama_barang, u.nama_satuan
       FROM barang_masuk_detail d
       JOIN barang b ON b.id = d.barang_id
       JOIN satuan u ON u.id = b.satuan_id
      WHERE d.barang_masuk_id = $1
      ORDER BY d.id ASC`,
    [id]
  );
  return rows;
};

module.exports = { findAll, countAll, findById, findDetails };
