-- ============================================================
-- SCHEMA: Inventory Management System
-- Jalankan: psql -U <user> -d <database> -f schema.sql
-- Semua tabel menggunakan snake_case + kolom audit + soft delete
-- ============================================================

-- Matikan FK sementara agar order pembuatan tabel bebas
SET session_replication_role = 'replica';

-- ------------------------------------------------------------
-- 1. roles : daftar hak akses pengguna
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS roles (
    id          SERIAL PRIMARY KEY,
    nama_role   VARCHAR(50) NOT NULL UNIQUE,
    created_at  TIMESTAMP DEFAULT NOW(),
    updated_at  TIMESTAMP DEFAULT NOW()
);

-- ------------------------------------------------------------
-- 2. users : akun pengguna (Admin Gudang, Staff Gudang, Owner)
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS users (
    id          SERIAL PRIMARY KEY,
    role_id     INTEGER NOT NULL REFERENCES roles(id),
    username    VARCHAR(50) NOT NULL UNIQUE,
    password    VARCHAR(255) NOT NULL,              -- disimpan dalam bentuk bcrypt hash
    nama        VARCHAR(100) NOT NULL,
    no_hp       VARCHAR(20),
    theme       VARCHAR(10) DEFAULT 'light',        -- light / dark
    is_active   BOOLEAN DEFAULT TRUE,
    created_at  TIMESTAMP DEFAULT NOW(),
    updated_at  TIMESTAMP DEFAULT NOW(),
    created_by  INTEGER,
    updated_by  INTEGER
);

-- ------------------------------------------------------------
-- 3. kategori : master kategori barang
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS kategori (
    id              SERIAL PRIMARY KEY,
    nama_kategori   VARCHAR(100) NOT NULL UNIQUE,
    deskripsi       TEXT,
    is_active       BOOLEAN DEFAULT TRUE,
    created_at      TIMESTAMP DEFAULT NOW(),
    updated_at      TIMESTAMP DEFAULT NOW(),
    created_by      INTEGER,
    updated_by      INTEGER
);

-- ------------------------------------------------------------
-- 4. supplier : master pemasok barang
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS supplier (
    id              SERIAL PRIMARY KEY,
    nama_supplier   VARCHAR(150) NOT NULL,
    nama_pic        VARCHAR(100),
    no_hp           VARCHAR(20),
    email           VARCHAR(100),
    alamat          TEXT,
    is_active       BOOLEAN DEFAULT TRUE,
    created_at      TIMESTAMP DEFAULT NOW(),
    updated_at      TIMESTAMP DEFAULT NOW(),
    created_by      INTEGER,
    updated_by      INTEGER
);

-- ------------------------------------------------------------
-- 5. satuan : master satuan barang (PCS, BOX, PACK, ...)
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS satuan (
    id              SERIAL PRIMARY KEY,
    nama_satuan     VARCHAR(50) NOT NULL UNIQUE,
    keterangan      TEXT,
    is_active       BOOLEAN DEFAULT TRUE,
    created_at      TIMESTAMP DEFAULT NOW(),
    updated_at      TIMESTAMP DEFAULT NOW(),
    created_by      INTEGER,
    updated_by      INTEGER
);

-- ------------------------------------------------------------
-- 6. tujuan_pengeluaran : master tujuan barang keluar
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS tujuan_pengeluaran (
    id              SERIAL PRIMARY KEY,
    nama_tujuan     VARCHAR(150) NOT NULL UNIQUE,
    keterangan      TEXT,
    is_active       BOOLEAN DEFAULT TRUE,
    created_at      TIMESTAMP DEFAULT NOW(),
    updated_at      TIMESTAMP DEFAULT NOW(),
    created_by      INTEGER,
    updated_by      INTEGER
);

-- ------------------------------------------------------------
-- 7. barang : master barang (stok tersimpan di sini)
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS barang (
    id              SERIAL PRIMARY KEY,
    kode_barang     VARCHAR(20) NOT NULL UNIQUE,     -- otomatis: BRG000001
    nama_barang     VARCHAR(150) NOT NULL,
    kategori_id     INTEGER NOT NULL REFERENCES kategori(id),
    supplier_id     INTEGER NOT NULL REFERENCES supplier(id),
    satuan_id       INTEGER NOT NULL REFERENCES satuan(id),
    harga_beli      NUMERIC(15,2) DEFAULT 0,
    harga_jual      NUMERIC(15,2) DEFAULT 0,
    stok            INTEGER DEFAULT 0,
    min_stok        INTEGER DEFAULT 0,
    deskripsi       TEXT,
    is_active       BOOLEAN DEFAULT TRUE,
    created_at      TIMESTAMP DEFAULT NOW(),
    updated_at      TIMESTAMP DEFAULT NOW(),
    created_by      INTEGER,
    updated_by      INTEGER,
    CHECK (stok >= 0)               -- stok tidak boleh negatif
);

-- ------------------------------------------------------------
-- 8. barang_masuk : header transaksi barang masuk
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS barang_masuk (
    id              SERIAL PRIMARY KEY,
    no_transaksi    VARCHAR(20) NOT NULL UNIQUE,     -- otomatis: BM000001
    tanggal         DATE NOT NULL DEFAULT CURRENT_DATE,
    supplier_id     INTEGER NOT NULL REFERENCES supplier(id),
    user_id         INTEGER NOT NULL REFERENCES users(id),  -- yang membuat transaksi
    keterangan      TEXT,
    created_at      TIMESTAMP DEFAULT NOW(),
    updated_at      TIMESTAMP DEFAULT NOW()
);

-- ------------------------------------------------------------
-- 9. barang_masuk_detail : detail barang pada transaksi masuk
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS barang_masuk_detail (
    id              SERIAL PRIMARY KEY,
    barang_masuk_id INTEGER NOT NULL REFERENCES barang_masuk(id),
    barang_id       INTEGER NOT NULL REFERENCES barang(id),
    qty             INTEGER NOT NULL CHECK (qty > 0),
    harga_beli      NUMERIC(15,2) DEFAULT 0,         -- harga saat transaksi (histori)
    created_at      TIMESTAMP DEFAULT NOW(),
    updated_at      TIMESTAMP DEFAULT NOW()
);

-- ------------------------------------------------------------
-- 10. barang_keluar : header transaksi barang keluar
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS barang_keluar (
    id                      SERIAL PRIMARY KEY,
    no_transaksi            VARCHAR(20) NOT NULL UNIQUE,  -- otomatis: BK000001
    tanggal                 DATE NOT NULL DEFAULT CURRENT_DATE,
    tujuan_pengeluaran_id   INTEGER NOT NULL REFERENCES tujuan_pengeluaran(id),
    user_id                 INTEGER NOT NULL REFERENCES users(id),
    keterangan              TEXT,
    created_at              TIMESTAMP DEFAULT NOW(),
    updated_at              TIMESTAMP DEFAULT NOW()
);

-- ------------------------------------------------------------
-- 11. barang_keluar_detail : detail barang pada transaksi keluar
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS barang_keluar_detail (
    id               SERIAL PRIMARY KEY,
    barang_keluar_id INTEGER NOT NULL REFERENCES barang_keluar(id),
    barang_id        INTEGER NOT NULL REFERENCES barang(id),
    qty              INTEGER NOT NULL CHECK (qty > 0),
    harga_jual       NUMERIC(15,2) DEFAULT 0,        -- harga saat transaksi (histori)
    created_at       TIMESTAMP DEFAULT NOW(),
    updated_at       TIMESTAMP DEFAULT NOW()
);

-- Aktifkan kembali FK
SET session_replication_role = 'origin';

-- Indeks untuk mempercepat pencarian
CREATE INDEX IF NOT EXISTS idx_users_role        ON users(role_id);
CREATE INDEX IF NOT EXISTS idx_barang_kategori   ON barang(kategori_id);
CREATE INDEX IF NOT EXISTS idx_barang_supplier   ON barang(supplier_id);
CREATE INDEX IF NOT EXISTS idx_barang_satuan     ON barang(satuan_id);
CREATE INDEX IF NOT EXISTS idx_bm_supplier       ON barang_masuk(supplier_id);
CREATE INDEX IF NOT EXISTS idx_bmd_barang        ON barang_masuk_detail(barang_id);
CREATE INDEX IF NOT EXISTS idx_bk_tujuan         ON barang_keluar(tujuan_pengeluaran_id);
CREATE INDEX IF NOT EXISTS idx_bkd_barang        ON barang_keluar_detail(barang_id);
