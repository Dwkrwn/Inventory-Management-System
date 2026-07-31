-- ============================================================
-- SEED DATA: Inventory Management System
-- Jalankan: psql -U <user> -d <database> -f seed.sql
-- Data awal: roles, user contoh, kategori, satuan, tujuan pengeluaran
-- Password default semua user: admin123 (bcrypt hash)
-- ============================================================

-- ---------- Roles ----------
INSERT INTO roles (nama_role) VALUES
('admin'),
('staff'),
('owner')
ON CONFLICT (nama_role) DO NOTHING;

-- ---------- Users ----------
-- Username: admin / staff / owner, password: admin123
INSERT INTO users (role_id, username, password, nama, no_hp, theme, is_active) VALUES
(1, 'admin', '$2b$10$dVKxKSfj1.djcTkHyhIY0ua8k1cA2hdvKuKpUwDrK6Bya8hKYTQh.', 'Admin Gudang', '081234567890', 'light', TRUE),
(2, 'staff', '$2b$10$dVKxKSfj1.djcTkHyhIY0ua8k1cA2hdvKuKpUwDrK6Bya8hKYTQh.', 'Staff Gudang', '081234567891', 'light', TRUE),
(3, 'owner', '$2b$10$dVKxKSfj1.djcTkHyhIY0ua8k1cA2hdvKuKpUwDrK6Bya8hKYTQh.', 'Pemilik', '081234567892', 'light', TRUE)
ON CONFLICT (username) DO NOTHING;

-- ---------- Kategori ----------
INSERT INTO kategori (nama_kategori, deskripsi) VALUES
('Elektronik', 'Barang elektronik dan kelistrikan'),
('Makanan', 'Produk makanan dan minuman'),
('ATK', 'Alat tulis kantor')
ON CONFLICT (nama_kategori) DO NOTHING;

-- ---------- Satuan ----------
INSERT INTO satuan (nama_satuan, keterangan) VALUES
('PCS', 'Per satuan buah'),
('BOX', 'Per kotak'),
('PACK', 'Per bungkus/pak'),
('LITER', 'Ukuran liter'),
('KG', 'Ukuran kilogram')
ON CONFLICT (nama_satuan) DO NOTHING;

-- ---------- Tujuan Pengeluaran ----------
INSERT INTO tujuan_pengeluaran (nama_tujuan, keterangan) VALUES
('Penjualan', 'Barang keluar karena transaksi penjualan'),
('Penggunaan Internal', 'Barang dipakai untuk kebutuhan internal'),
('Rusak', 'Barang keluar karena rusak / tidak layak')
ON CONFLICT (nama_tujuan) DO NOTHING;
