const pool = require('../config/db');

const laporanBarangMasuk = async (filters) => {
  const { tanggal_awal, tanggal_akhir, barang_id, supplier_id, kategori_id } = filters;

  const { rows } = await pool.query(
    `SELECT bm.no_transaksi, bm.tanggal,
            s.nama_supplier,
            b.kode_barang, b.nama_barang, k.nama_kategori, u.nama_satuan,
            d.qty, d.harga_beli, (d.qty * d.harga_beli) AS total
       FROM barang_masuk_detail d
       JOIN barang_masuk bm ON bm.id = d.barang_masuk_id
       JOIN barang b ON b.id = d.barang_id
       JOIN kategori k ON k.id = b.kategori_id
       JOIN satuan u ON u.id = b.satuan_id
       JOIN supplier s ON s.id = bm.supplier_id
      WHERE ($1::date IS NULL OR bm.tanggal >= $1)
        AND ($2::date IS NULL OR bm.tanggal <= $2)
        AND ($3::int IS NULL OR d.barang_id = $3)
        AND ($4::int IS NULL OR bm.supplier_id = $4)
        AND ($5::int IS NULL OR b.kategori_id = $5)
      ORDER BY bm.tanggal ASC, bm.no_transaksi ASC`,
    [tanggal_awal, tanggal_akhir, barang_id, supplier_id, kategori_id]
  );
  return rows;
};

const laporanBarangKeluar = async (filters) => {
  const { tanggal_awal, tanggal_akhir, barang_id, supplier_id, kategori_id } = filters;

  const { rows } = await pool.query(
    `SELECT bk.no_transaksi, bk.tanggal, t.nama_tujuan,
            b.kode_barang, b.nama_barang, k.nama_kategori, u.nama_satuan,
            d.qty, d.harga_jual, (d.qty * d.harga_jual) AS total
       FROM barang_keluar_detail d
       JOIN barang_keluar bk ON bk.id = d.barang_keluar_id
       JOIN barang b ON b.id = d.barang_id
       JOIN kategori k ON k.id = b.kategori_id
       JOIN satuan u ON u.id = b.satuan_id
       JOIN tujuan_pengeluaran t ON t.id = bk.tujuan_pengeluaran_id
      WHERE ($1::date IS NULL OR bk.tanggal >= $1)
        AND ($2::date IS NULL OR bk.tanggal <= $2)
        AND ($3::int IS NULL OR d.barang_id = $3)
        AND ($4::int IS NULL OR b.supplier_id = $4)
        AND ($5::int IS NULL OR b.kategori_id = $5)
      ORDER BY bk.tanggal ASC, bk.no_transaksi ASC`,
    [tanggal_awal, tanggal_akhir, barang_id, supplier_id, kategori_id]
  );
  return rows;
};

const laporanStok = async (filters) => {
  const { kategori_id, supplier_id, status } = filters;

  const { rows } = await pool.query(
    `SELECT b.kode_barang, b.nama_barang, k.nama_kategori, s.nama_supplier, u.nama_satuan,
            b.stok, b.min_stok, b.harga_beli, b.harga_jual,
            CASE WHEN b.min_stok > 0 AND b.stok <= b.min_stok THEN TRUE ELSE FALSE END AS stok_menipis
       FROM barang b
       JOIN kategori k ON k.id = b.kategori_id
       JOIN supplier s ON s.id = b.supplier_id
       JOIN satuan u ON u.id = b.satuan_id
      WHERE b.is_active = TRUE
        AND ($1::int IS NULL OR b.kategori_id = $1)
        AND ($2::int IS NULL OR b.supplier_id = $2)
        AND ($3 = '' OR (CASE WHEN $3 = 'menipis' THEN (b.min_stok > 0 AND b.stok <= b.min_stok)
                              WHEN $3 = 'aman' THEN (b.min_stok = 0 OR b.stok > b.min_stok)
                              ELSE TRUE END))
      ORDER BY b.nama_barang ASC`,
    [kategori_id, supplier_id, status || '']
  );
  return rows;
};

module.exports = { laporanBarangMasuk, laporanBarangKeluar, laporanStok };
