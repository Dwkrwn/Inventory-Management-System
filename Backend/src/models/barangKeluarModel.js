const pool = require('../config/db');

const findAll = async (startDate = null, endDate = null, tujuanId = null, { limit, offset }) => {
  const { rows } = await pool.query(
    `SELECT bk.id, bk.no_transaksi, bk.tanggal, bk.keterangan,
            t.id AS tujuan_id, t.nama_tujuan,
            u.id AS user_id, u.nama AS created_by_name
       FROM barang_keluar bk
       JOIN tujuan_pengeluaran t ON t.id = bk.tujuan_pengeluaran_id
       JOIN users u ON u.id = bk.user_id
      WHERE ($1::date IS NULL OR bk.tanggal >= $1)
        AND ($2::date IS NULL OR bk.tanggal <= $2)
        AND ($3::int IS NULL OR bk.tujuan_pengeluaran_id = $3)
      ORDER BY bk.tanggal DESC, bk.id DESC
      LIMIT $4 OFFSET $5`,
    [startDate, endDate, tujuanId, limit, offset]
  );
  return rows;
};

const countAll = async (startDate = null, endDate = null, tujuanId = null) => {
  const { rows } = await pool.query(
    `SELECT COUNT(*)::int AS total
       FROM barang_keluar bk
      WHERE ($1::date IS NULL OR bk.tanggal >= $1)
        AND ($2::date IS NULL OR bk.tanggal <= $2)
        AND ($3::int IS NULL OR bk.tujuan_pengeluaran_id = $3)`,
    [startDate, endDate, tujuanId]
  );
  return rows[0].total;
};

const findById = async (id) => {
  const { rows } = await pool.query(
    `SELECT bk.id, bk.no_transaksi, bk.tanggal, bk.keterangan, bk.created_at,
            t.id AS tujuan_id, t.nama_tujuan,
            u.id AS user_id, u.nama AS created_by_name
       FROM barang_keluar bk
       JOIN tujuan_pengeluaran t ON t.id = bk.tujuan_pengeluaran_id
       JOIN users u ON u.id = bk.user_id
      WHERE bk.id = $1`,
    [id]
  );
  return rows[0] || null;
};

const findDetails = async (id) => {
  const { rows } = await pool.query(
    `SELECT d.id, d.qty, d.harga_jual,
            b.id AS barang_id, b.kode_barang, b.nama_barang, u.nama_satuan
       FROM barang_keluar_detail d
       JOIN barang b ON b.id = d.barang_id
       JOIN satuan u ON u.id = b.satuan_id
      WHERE d.barang_keluar_id = $1
      ORDER BY d.id ASC`,
    [id]
  );
  return rows;
};

module.exports = { findAll, countAll, findById, findDetails };
