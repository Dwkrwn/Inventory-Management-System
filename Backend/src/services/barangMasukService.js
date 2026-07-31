const pool = require('../config/db');
const { generateNomorTransaksi } = require('../utils/generate');

const createTransaksi = async (data, userId) => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    // 1. Generate nomor transaksi otomatis (BM000001)
    const no_transaksi = await generateNomorTransaksi('BM');

    // 2. Simpan header barang_masuk
    const header = await client.query(
      `INSERT INTO barang_masuk (no_transaksi, tanggal, supplier_id, user_id, keterangan)
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [no_transaksi, data.tanggal, data.supplier_id, userId, data.keterangan || null]
    );
    const headerId = header.rows[0].id;

    // 3. Simpan detail + tambah stok setiap barang
    for (const item of data.detail) {
      const barang = await client.query(
        'SELECT id, stok FROM barang WHERE id = $1 AND is_active = TRUE',
        [item.barang_id]
      );
      if (!barang.rows[0]) {
        throw Object.assign(new Error(`Barang dengan id ${item.barang_id} tidak ditemukan`), {
          type: 'TransaksiError',
          status: 404,
        });
      }

      await client.query(
        `INSERT INTO barang_masuk_detail (barang_masuk_id, barang_id, qty, harga_beli)
         VALUES ($1, $2, $3, $4)`,
        [headerId, item.barang_id, item.qty, item.harga_beli || 0]
      );

      await client.query(
        `UPDATE barang SET stok = stok + $1, updated_at = NOW() WHERE id = $2`,
        [item.qty, item.barang_id]
      );
    }

    await client.query('COMMIT');
    return header.rows[0];
  } catch (err) {
    await client.query('ROLLBACK');
    throw err;
  } finally {
    client.release();
  }
};

module.exports = { createTransaksi };
