const pool = require('../config/db');

const totalBarang = async () => {
  const { rows } = await pool.query(
    'SELECT COUNT(*)::int AS total FROM barang WHERE is_active = TRUE'
  );
  return rows[0].total;
};

const totalSupplier = async () => {
  const { rows } = await pool.query(
    'SELECT COUNT(*)::int AS total FROM supplier WHERE is_active = TRUE'
  );
  return rows[0].total;
};

const barangMasukHariIni = async () => {
  const { rows } = await pool.query(
    `SELECT COALESCE(SUM(d.qty), 0)::int AS total
       FROM barang_masuk_detail d
       JOIN barang_masuk bm ON bm.id = d.barang_masuk_id
      WHERE bm.tanggal = CURRENT_DATE`
  );
  return rows[0].total;
};

const barangKeluarHariIni = async () => {
  const { rows } = await pool.query(
    `SELECT COALESCE(SUM(d.qty), 0)::int AS total
       FROM barang_keluar_detail d
       JOIN barang_keluar bk ON bk.id = d.barang_keluar_id
      WHERE bk.tanggal = CURRENT_DATE`
  );
  return rows[0].total;
};

const stokMenipis = async () => {
  const { rows } = await pool.query(
    `SELECT COUNT(*)::int AS total
       FROM barang
      WHERE is_active = TRUE AND min_stok > 0 AND stok <= min_stok`
  );
  return rows[0].total;
};

const listStokMenipis = async () => {
  const { rows } = await pool.query(
    `SELECT b.id, b.kode_barang, b.nama_barang, b.stok, b.min_stok,
            k.nama_kategori, u.nama_satuan
       FROM barang b
       JOIN kategori k ON k.id = b.kategori_id
       JOIN satuan u ON u.id = b.satuan_id
      WHERE b.is_active = TRUE AND b.min_stok > 0 AND b.stok <= b.min_stok
      ORDER BY (b.stok - b.min_stok) ASC
      LIMIT 10`
  );
  return rows;
};

const grafikMasuk = async () => {
  const { rows } = await pool.query(
    `SELECT to_char(bm.tanggal, 'YYYY-MM') AS bulan,
            COALESCE(SUM(d.qty), 0)::int AS total
       FROM barang_masuk bm
       JOIN barang_masuk_detail d ON d.barang_masuk_id = bm.id
      WHERE bm.tanggal >= date_trunc('month', CURRENT_DATE) - interval '11 months'
      GROUP BY bulan
      ORDER BY bulan ASC`
  );
  return rows;
};

const grafikKeluar = async () => {
  const { rows } = await pool.query(
    `SELECT to_char(bk.tanggal, 'YYYY-MM') AS bulan,
            COALESCE(SUM(d.qty), 0)::int AS total
       FROM barang_keluar bk
       JOIN barang_keluar_detail d ON d.barang_keluar_id = bk.id
      WHERE bk.tanggal >= date_trunc('month', CURRENT_DATE) - interval '11 months'
      GROUP BY bulan
      ORDER BY bulan ASC`
  );
  return rows;
};

module.exports = {
  totalBarang,
  totalSupplier,
  barangMasukHariIni,
  barangKeluarHariIni,
  stokMenipis,
  listStokMenipis,
  grafikMasuk,
  grafikKeluar,
};
