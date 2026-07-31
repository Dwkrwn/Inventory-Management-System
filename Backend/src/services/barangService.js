const pool = require('../config/db');
const barangModel = require('../models/barangModel');
const { generateKodeBarang } = require('../utils/generate');

const createBarang = async (data, userId) => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const kode_barang = await generateKodeBarang();
    const result = await client.query(
      `INSERT INTO barang (kode_barang, nama_barang, kategori_id, supplier_id, satuan_id,
                           harga_beli, harga_jual, min_stok, deskripsi, created_by, updated_by)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $10) RETURNING *`,
      [
        kode_barang,
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
    await client.query('COMMIT');
    return result.rows[0];
  } catch (err) {
    await client.query('ROLLBACK');
    throw err;
  } finally {
    client.release();
  }
};

const updateBarang = async (id, data, userId) => {
  const exists = await barangModel.findById(id);
  if (!exists) return null;
  return barangModel.update(id, data, userId);
};

module.exports = { createBarang, updateBarang };
