# Dokumentasi Singkat Program Inventory Management

## 1. Gambaran Umum

Program ini adalah aplikasi manajemen inventaris berbasis web yang terdiri dari:

- Backend API menggunakan Node.js + Express
- Frontend antarmuka pengguna menggunakan Vue 3 + Vite
- Database PostgreSQL

Tujuan utamanya adalah membantu perusahaan atau gudang mengelola data barang, transaksi masuk/keluar, stok, laporan, serta hak akses pengguna.

---

## 2. Tujuan Aplikasi

Aplikasi ini dirancang untuk menangani beberapa kebutuhan operasional inventori, seperti:

- Mengelola data master barang
- Mengelola kategori, supplier, satuan, dan tujuan pengeluaran
- Mencatat transaksi barang masuk dan barang keluar
- Memantau stok barang
- Menyediakan dashboard dan laporan
- Mengatur hak akses pengguna berdasarkan peran (admin, staff, owner)

---

## 3. Arsitektur Aplikasi

### Backend

Backend dibangun dengan struktur modular agar mudah dipelihara.

Struktur folder backend:

```text
Backend/
  package.json
  src/
    app.js
    server.js
    config/
    controllers/
    middleware/
    models/
    routes/
    services/
    utils/
    validations/
  db/
    schema.sql
    seed.sql
```

Komponen utama backend:

- app.js: inisialisasi Express dan registrasi middleware utama
- server.js: menjalankan server dan menghubungkan ke database
- routes/: mendefinisikan endpoint API
- controllers/: menangani request dan response
- services/: logika bisnis aplikasi
- models/: interaksi dengan database
- middleware/: autentikasi, otorisasi role, dan error handling
- validations/: validasi input dari user

### Frontend

Frontend menggunakan Vue 3 dengan pendekatan komponen modular.

Struktur folder frontend:

```text
Frontend/
  package.json
  src/
    App.vue
    main.js
    assets/
    components/
    composables/
    layouts/
    pages/
    router/
    services/
    stores/
    utils/
```

Komponen utama frontend:

- pages/: halaman utama aplikasi seperti dashboard, barang, kategori, transaksi, laporan, dan user
- layouts/: layout utama aplikasi dan layout auth
- router/: navigasi halaman dan pengaturan menu
- stores/: state aplikasi, termasuk autentikasi menggunakan Pinia
- services/: komunikasi ke backend melalui Axios

---

## 4. Alur Kerja Aplikasi

### A. Login dan Autentikasi

1. User memasukkan username dan password
2. Backend memverifikasi kredensial
3. Sistem menghasilkan token JWT
4. Frontend menyimpan token dan data user di local storage
5. Setiap request ke API membawa token untuk otentikasi

### B. Role-Based Access Control

Sistem memiliki pembagian akses berdasarkan role:

- admin: dapat mengelola semua data, termasuk pengguna
- staff: dapat mengakses operasi data dan transaksi
- owner: dapat melihat data dan laporan, tetapi dengan batasan tertentu

### C. Pengelolaan Data Master

Aplikasi mengelola data master seperti:

- Barang
- Kategori
- Supplier
- Satuan
- Tujuan Pengeluaran

### D. Transaksi Inventori

Aplikasi mencatat transaksi:

- Barang Masuk
- Barang Keluar

Transaksi ini akan mempengaruhi stok barang secara otomatis.

### E. Dashboard dan Laporan

Sistem menyediakan halaman dashboard serta laporan untuk melihat:

- ringkasan stok
- transaksi terbaru
- kondisi barang yang mendekati minimum stok
- laporan barang masuk/keluar

---

## 5. Struktur Database

Database menggunakan PostgreSQL dan terdiri dari beberapa tabel utama:

### Tabel Master

- roles: daftar peran pengguna
- users: data akun pengguna
- kategori: kategori barang
- supplier: pemasok barang
- satuan: satuan ukuran barang
- tujuan_pengeluaran: tujuan barang keluar
- barang: data barang dan stok

### Tabel Transaksi

- barang_masuk: header transaksi barang masuk
- barang_masuk_detail: detail barang yang masuk
- barang_keluar: header transaksi barang keluar
- barang_keluar_detail: detail barang yang keluar

### Karakteristik database

- menggunakan snake_case
- terdapat kolom created_at/updated_at
- terdapat relasi antar tabel
- stok diberi batas minimal tidak boleh negatif

---

## 6. Fitur Utama yang Tersedia

Berikut fitur inti yang terlihat dari struktur proyek:

- Autentikasi pengguna
- Manajemen profil pengguna
- CRUD master data
- Transaksi barang masuk dan keluar
- Dashboard
- Laporan inventori
- Hak akses berbasis role
- UI responsif dan menu navigasi dinamis

---

## 7. Alur Frontend

Frontend memiliki alur navigasi sebagai berikut:

- Halaman login untuk masuk ke sistem
- Halaman dashboard setelah login
- Menu data master untuk barang, kategori, supplier, satuan, dan tujuan pengeluaran
- Menu transaksi untuk barang masuk dan keluar
- Halaman laporan dan pengelolaan user

Routing dibuat secara terstruktur sehingga halaman tertentu dapat dibatasi aksesnya berdasarkan role pengguna.

---

## 8. Kelebihan Struktur Proyek Ini

Struktur ini cukup baik karena:

- memisahkan backend dan frontend secara jelas
- menggunakan pola modular (routes, controllers, services, models)
- memudahkan pengembangan fitur baru
- menerapkan role-based access control
- mendukung pemisahan logika bisnis dan tampilan

---

## 9. Kesimpulan

Program inventory ini adalah sistem manajemen stok dan transaksi barang yang cukup lengkap untuk kebutuhan gudang atau perusahaan kecil hingga menengah. Dengan arsitektur backend/frontend yang terpisah, sistem ini relatif mudah dikembangkan lebih lanjut, misalnya menambahkan fitur cetak laporan, grafik stok, integrasi PDF/Excel, atau modul approval transaksi.

---

## 10. Catatan Teknis Singkat

Untuk menjalankan aplikasi, biasanya diperlukan:

- PostgreSQL berjalan
- file environment backend diatur dengan konfigurasi database dan JWT
- install dependency backend dan frontend
- jalankan server backend dan frontend secara terpisah
