const pool = require('../config/db');

const findAll = async ({ search, kategori, supplier, sort, order, limit, offset }) => {
  const { rows } = await pool.query(
    `SELECT b.id, b.kode_barang, b.nama_barang, b.harga_beli, b.harga_jual,
            b.stok, b.min_stok, b.deskripsi, b.is_active,
            k.id AS kategori_id, k.nama_kategori,
            s.id AS supplier_id, s.nama_supplier,
            u.id AS satuan_id, u.nama_satuan
       FROM barang b
       JOIN kategori k ON k.id = b.kategori_id
       JOIN supplier s ON s.id = b.supplier_id
       JOIN satuan u ON u.id = b.satuan_id
      WHERE b.is_active = TRUE
        AND ($1::text = '' OR b.nama_barang ILIKE '%' || $1 || '%')
        AND ($2::int IS NULL OR b.kategori_id = $2)
        AND ($3::int IS NULL OR b.supplier_id = $3)
      ORDER BY b.${sort} ${order}
      LIMIT $4 OFFSET $5`,
    [search, kategori, supplier, limit, offset]
  );
  return rows;
};

const countAll = async ({ search, kategori, supplier }) => {
  const { rows } = await pool.query(
    `SELECT COUNT(*)::int AS total
       FROM barang b
      WHERE b.is_active = TRUE
        AND ($1::text = '' OR b.nama_barang ILIKE '%' || $1 || '%')
        AND ($2::int IS NULL OR b.kategori_id = $2)
        AND ($3::int IS NULL OR b.supplier_id = $3)`,
    [search, kategori, supplier]
  );
  return rows[0].total;
};

const findById = async (id) => {
  const { rows } = await pool.query(
    `SELECT b.id, b.kode_barang, b.nama_barang, b.harga_beli, b.harga_jual,
            b.stok, b.min_stok, b.deskripsi, b.is_active,
            k.id AS kategori_id, k.nama_kategori,
            s.id AS supplier_id, s.nama_supplier,
            u.id AS satuan_id, u.nama_satuan
       FROM barang b
       JOIN kategori k ON k.id = b.kategori_id
       JOIN supplier s ON s.id = b.supplier_id
       JOIN satuan u ON u.id = b.satuan_id
      WHERE b.id = $1`,
    [id]
  );
  return rows[0] || null;
};

const findByKode = async (kode_barang) => {
  const { rows } = await pool.query('SELECT id FROM barang WHERE kode_barang = $1', [kode_barang]);
  return rows[0] || null;
};

const isUsedInTransaksi = async (id) => {
  const { rows } = await pool.query(
    `SELECT (SELECT COUNT(*) FROM barang_masuk_detail WHERE barang_id = $1)
          + (SELECT COUNT(*) FROM barang_keluar_detail WHERE barang_id = $1) AS total`,
    [id]
  );
  return Number(rows[0].total) > 0;
};

const create = async (data, userId) => {
  const { rows } = await pool.query(
    `INSERT INTO barang (kode_barang, nama_barang, kategori_id, supplier_id, satuan_id,
                         harga_beli, harga_jual, min_stok, deskripsi, created_by, updated_by)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $10) RETURNING *`,
    [
      data.kode_barang,
      data.nama_barang,
      data.kategori_id,
      data.supplier_id,
      data.satuan_id,
      data.harga_beli,
      data.harga_jual,
      data.min_stok,
      data.deskripsi,
      userId,
    ]
  );
  return rows[0];
};

const update = async (id, data, userId) => {
  const { rows } = await pool.query(
    `UPDATE barang
        SET nama_barang = $1, kategori_id = $2, supplier_id = $3, satuan_id = $4,
            harga_beli = $5, harga_jual = $6, min_stok = $7, deskripsi = $8,
            updated_by = $9, updated_at = NOW()
      WHERE id = $10 RETURNING *`,
    [
      data.nama_barang,
      data.kategori_id,
      data.supplier_id,
      data.satuan_id,
      data.harga_beli,
      data.harga_jual,
      data.min_stok,
      data.deskripsi,
      userId,
      id,
    ]
  );
  return rows[0];
};

const softDelete = async (id, userId) => {
  const { rows } = await pool.query(
    `UPDATE barang SET is_active = FALSE, updated_by = $2, updated_at = NOW()
      WHERE id = $1 RETURNING *`,
    [id, userId]
  );
  return rows[0];
};

const findAllSimple = async () => {
  const { rows } = await pool.query(
    `SELECT b.id, b.kode_barang, b.nama_barang, b.stok, b.harga_beli, b.harga_jual,
            b.min_stok, u.nama_satuan
       FROM barang b
       JOIN satuan u ON u.id = b.satuan_id
      WHERE b.is_active = TRUE
      ORDER BY b.nama_barang ASC`
  );
  return rows;
};

module.exports = {
  findAll,
  countAll,
  findById,
  findByKode,
  isUsedInTransaksi,
  create,
  update,
  softDelete,
  findAllSimple,
};
