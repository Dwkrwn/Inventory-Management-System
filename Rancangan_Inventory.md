# Dokumen Tahap 1 — Project Goal

## Nama Project

**Inventory Management System**

---

# Tujuan Project

Membangun sebuah aplikasi **Inventory Management System** berbasis desktop yang bertujuan untuk mempermudah proses pengelolaan stok barang pada gudang.

Aplikasi ini akan membantu proses pencatatan barang masuk dan barang keluar sehingga seluruh data stok dapat tercatat secara sistematis, mudah dicari, dan lebih akurat dibandingkan pencatatan secara manual.

---

# Latar Belakang Masalah

Saat ini proses pencatatan stok masih dilakukan secara manual sehingga menimbulkan beberapa kendala, antara lain:

- Pencatatan barang masuk dan barang keluar membutuhkan waktu yang lebih lama.
- Sulit mengetahui jumlah stok barang yang tersedia secara cepat.
- Data stok berpotensi tidak sesuai dengan kondisi di gudang.
- Riwayat pergerakan barang sulit ditelusuri ketika diperlukan.

Melalui aplikasi Inventory Management System, proses tersebut diharapkan menjadi lebih cepat, akurat, dan terdokumentasi dengan baik.

---

# Target Pengguna

Aplikasi akan digunakan oleh tiga jenis pengguna:

### 1. Admin Gudang

Bertanggung jawab mengelola seluruh data master dan transaksi inventori.

### 2. Staff Gudang

Bertugas melakukan pencatatan barang masuk dan barang keluar sesuai aktivitas operasional gudang.

### 3. Owner

Melihat laporan, statistik, dan kondisi stok barang tanpa mengubah data operasional.

---

# Platform

Aplikasi akan dikembangkan sebagai **Desktop Application** menggunakan teknologi web modern.

---

# Teknologi yang Digunakan

## Frontend

- Vue.js

## Backend

- Express.js

## Database

- PostgreSQL

## Styling

- Tailwind CSS

---

# Tingkat Kesulitan

Project ini dirancang pada tingkat **Beginner**.

Walaupun ditujukan untuk pemula, project tetap mengikuti alur pengembangan perangkat lunak yang digunakan di dunia kerja sehingga menjadi media belajar yang terstruktur.

---

# Target Pembelajaran

Melalui project ini diharapkan dapat memahami:

- Alur pembuatan project dari tahap perencanaan hingga selesai.
- Cara membangun REST API menggunakan Express.js.
- Konsep relasi database menggunakan PostgreSQL.
- Integrasi antara frontend Vue.js dan backend Express.js.
- Proses deployment aplikasi.
- Penyusunan struktur project yang rapi dan mudah dikembangkan.

---

# Hasil yang Diharapkan

Setelah project selesai, aplikasi diharapkan mampu:

- Mengelola data barang.
- Mengelola data kategori.
- Mengelola data supplier.
- Mencatat barang masuk.
- Mencatat barang keluar.
- Menampilkan stok barang secara aktual.
- Menampilkan riwayat transaksi stok.
- Menyediakan laporan sederhana sebagai bahan evaluasi pengelolaan inventori.

===================================================================================================

# Dokumen Tahap 2 — Scope Project

## Nama Project

**Inventory Management System**

---

# Tujuan Scope Project

Scope Project bertujuan menentukan batasan pengembangan aplikasi agar proses pembuatan project lebih terarah, mudah dipahami, dan sesuai dengan tingkat kemampuan **Beginner**.

Versi pertama (MVP) difokuskan pada fitur-fitur inti yang sering digunakan dalam sistem inventory tanpa menambahkan fitur yang terlalu kompleks.

---

# Ruang Lingkup Project (MVP)

## 1. Authentication

Aplikasi menggunakan sistem login sehingga setiap pengguna harus melakukan autentikasi sebelum mengakses sistem.

Tujuan pembelajaran:

- Login
- Logout
- Authentication
- Session / JWT
- Hak Akses (Authorization)

---

## 2. Dashboard

Dashboard akan menampilkan informasi ringkas mengenai kondisi inventori.

Informasi yang ditampilkan:

- Total Barang
- Total Supplier
- Total Barang Masuk Hari Ini
- Total Barang Keluar Hari Ini
- Jumlah Stok Menipis

Tujuan pembelajaran:

- Ringkasan data
- Query agregasi
- Dashboard sederhana

---

## 3. Data Master

Modul Data Master terdiri dari:

### Barang

- Tambah Barang
- Edit Barang
- Hapus Barang
- Lihat Detail Barang

### Kategori

- CRUD Kategori

### Supplier

- CRUD Supplier

### Satuan

- CRUD Satuan

Tujuan pembelajaran:

- CRUD
- Relasi Database
- Validasi Form

---

## 4. Modul Transaksi

Aplikasi memiliki dua transaksi utama.

### Barang Masuk

Fungsi:

- Mencatat barang yang masuk ke gudang.
- Menambah jumlah stok barang.

### Barang Keluar

Fungsi:

- Mencatat barang yang keluar dari gudang.
- Mengurangi jumlah stok barang.

Tujuan pembelajaran:

- Transaksi Database
- Perhitungan Stok
- Riwayat Perubahan Data

---

## 5. Modul Laporan

Laporan yang tersedia:

- Laporan Barang Masuk
- Laporan Barang Keluar
- Laporan Stok Barang

Tujuan pembelajaran:

- Query Filter
- Penyajian Data
- Rekapitulasi Informasi

---

## 6. Pencarian dan Filter

Fitur yang disediakan:

- Pencarian Barang berdasarkan Nama Barang
- Filter berdasarkan Kategori
- Filter berdasarkan Supplier

Tujuan pembelajaran:

- Search
- Filter
- Query Dinamis

---

## 7. Dark Mode

Versi pertama akan mendukung Dark Mode.

Tujuan pembelajaran:

- Theme Switching
- Pengelolaan State
- Implementasi Dark Mode pada Tailwind CSS

---

# Fitur yang Tidak Masuk Versi Pertama (Out of Scope)

Untuk menjaga project tetap sederhana dan fokus pada pembelajaran, fitur berikut **tidak** akan dibuat pada versi pertama:

- Upload Gambar Barang
- Export PDF
- Export Excel
- Import Excel
- Barcode Scanner
- QR Code Scanner
- Multi Gudang
- Multi Cabang
- Notifikasi Email
- Realtime Notification
- Audit Log
- Role & Permission yang kompleks

Fitur-fitur tersebut dapat menjadi target pengembangan pada versi berikutnya.

---

# Modul Aplikasi

Aplikasi terdiri dari modul berikut:

1. Authentication
2. Dashboard
3. Master Barang
4. Master Kategori
5. Master Supplier
6. Master Satuan
7. Barang Masuk
8. Barang Keluar
9. Laporan Barang Masuk
10. Laporan Barang Keluar
11. Laporan Stok Barang
12. Pengaturan Tema (Dark Mode)

---

# Menu Aplikasi

Menu yang tersedia pada sidebar:

- Dashboard
- Barang
- Kategori
- Supplier
- Satuan
- Barang Masuk
- Barang Keluar
- Laporan
- Profile
- Pengaturan Tema
- Logout

---

# Target Pembelajaran pada Tahap Ini

Melalui ruang lingkup project ini diharapkan dapat memahami:

- Perancangan ruang lingkup aplikasi.
- Penentuan prioritas fitur menggunakan konsep MVP.
- Penyusunan modul aplikasi.
- Penyusunan struktur menu.
- Penentuan batasan pengembangan agar project tetap terarah.

===================================================================================================

# Dokumen Tahap 3 — Analisis User dan Hak Akses (User & Authorization)

## Tujuan

Tahap ini bertujuan menentukan siapa saja pengguna aplikasi, hak akses yang dimiliki setiap pengguna, serta aturan autentikasi dan otorisasi yang akan diterapkan pada Inventory Management System.

Dengan adanya pembagian hak akses, setiap pengguna hanya dapat mengakses fitur sesuai dengan tugas dan tanggung jawabnya.

---

# Role Pengguna

Aplikasi memiliki tiga jenis pengguna.

## 1. Admin Gudang

Admin Gudang merupakan pengguna dengan hak akses tertinggi dalam operasional aplikasi.

Tanggung jawab:

- Mengelola seluruh data master.
- Mengelola transaksi barang.
- Mengelola akun pengguna.
- Melihat seluruh laporan.

---

## 2. Staff Gudang

Staff Gudang bertanggung jawab terhadap aktivitas operasional gudang.

Tanggung jawab:

- Mencatat barang masuk.
- Mencatat barang keluar.
- Melihat data master.
- Melihat laporan.

Staff Gudang tidak memiliki izin untuk mengubah data master.

---

## 3. Owner

Owner berperan sebagai pengawas.

Tanggung jawab:

- Melihat kondisi inventori.
- Melihat dashboard.
- Melihat seluruh laporan.
- Memantau aktivitas gudang.

Owner tidak diperbolehkan melakukan perubahan terhadap data operasional.

---

# Authentication

Setiap pengguna wajib memiliki akun sendiri.

Informasi akun:

- Username
- Password

Seluruh pengguna harus melakukan login sebelum dapat menggunakan aplikasi.

Setelah berhasil login, sistem akan mengenali role pengguna dan memberikan hak akses sesuai dengan perannya.

---

# Authorization

Hak akses ditentukan berdasarkan Role-Based Access Control (RBAC).

Role yang digunakan:

- Admin Gudang
- Staff Gudang
- Owner

Setiap role hanya dapat mengakses menu dan fitur yang telah ditentukan.

---

# Hak Akses Admin Gudang

Admin Gudang memiliki akses penuh terhadap seluruh fitur aplikasi.

Menu yang dapat diakses:

- Dashboard
- Barang
- Kategori
- Supplier
- Satuan
- Barang Masuk
- Barang Keluar
- Laporan
- Kelola User
- Profil
- Pengaturan Tema (Dark Mode)
- Logout

Hak yang dimiliki:

- Create
- Read
- Update
- Delete

---

# Hak Akses Staff Gudang

Staff Gudang hanya bertugas menjalankan aktivitas operasional.

Menu yang dapat diakses:

- Dashboard
- Barang (Read)
- Kategori (Read)
- Supplier (Read)
- Satuan (Read)
- Barang Masuk
- Barang Keluar
- Laporan
- Profil
- Pengaturan Tema (Dark Mode)
- Logout

Hak yang dimiliki:

- Read
- Create Transaksi
- Update Profil

Staff Gudang tidak diperbolehkan:

- Menambah Barang
- Mengubah Barang
- Menghapus Barang
- Mengubah Data Master
- Menghapus Data Master
- Mengelola User

---

# Hak Akses Owner

Owner hanya bertugas melakukan monitoring.

Menu yang dapat diakses:

- Dashboard
- Barang (Read)
- Supplier (Read)
- Kategori (Read)
- Satuan (Read)
- Barang Masuk (Read)
- Barang Keluar (Read)
- Laporan
- Profil
- Pengaturan Tema (Dark Mode)
- Logout

Hak yang dimiliki:

- Read
- Update Profil

Owner tidak diperbolehkan:

- Menambah Data
- Mengubah Data
- Menghapus Data
- Melakukan Transaksi
- Mengelola User

---

# Matriks Hak Akses

| Modul          | Admin |     Staff     | Owner |
| -------------- | :---: | :-----------: | :---: |
| Login          |   ✓   |       ✓       |   ✓   |
| Dashboard      |   ✓   |       ✓       |   ✓   |
| Barang         | CRUD  |     Read      | Read  |
| Kategori       | CRUD  |     Read      | Read  |
| Supplier       | CRUD  |     Read      | Read  |
| Satuan         | CRUD  |     Read      | Read  |
| Barang Masuk   | CRUD  | Create & Read | Read  |
| Barang Keluar  | CRUD  | Create & Read | Read  |
| Laporan        |   ✓   |       ✓       |   ✓   |
| Kelola User    | CRUD  |       ✗       |   ✗   |
| Profil         |   ✓   |       ✓       |   ✓   |
| Ganti Password |   ✓   |       ✓       |   ✓   |
| Dark Mode      |   ✓   |       ✓       |   ✓   |

---

# Riwayat Pengguna (User Tracking)

Setiap transaksi akan menyimpan informasi pengguna yang membuat transaksi.

Contoh informasi yang disimpan:

- Dibuat Oleh (Created By)
- Tanggal Dibuat
- Terakhir Diubah Oleh
- Tanggal Perubahan

Tujuan:

- Mengetahui siapa yang melakukan transaksi.
- Memudahkan proses audit.
- Menjaga integritas data.

---

# Audit Data

Setiap tabel utama akan memiliki kolom:

- created_at
- updated_at

Kolom tersebut digunakan untuk mencatat waktu pembuatan dan perubahan data.

---

# Status Akun

Setiap akun memiliki status.

Pilihan status:

- Aktif
- Tidak Aktif

Jika akun dinonaktifkan:

- Pengguna tidak dapat login.
- Riwayat transaksi tetap tersimpan.

---

# Pengelolaan User

Pengelolaan akun pengguna hanya dapat dilakukan oleh Admin Gudang.

Admin dapat:

- Menambah User
- Mengubah Data User
- Mengubah Password User
- Mengaktifkan Akun
- Menonaktifkan Akun

Owner dan Staff Gudang tidak memiliki hak untuk mengelola akun pengguna.

---

# Target Pembelajaran pada Tahap Ini

Melalui tahap ini diharapkan dapat memahami:

- Konsep Authentication.
- Konsep Authorization.
- Role-Based Access Control (RBAC).
- Perancangan hak akses berdasarkan role.
- Hubungan antara tabel User dan tabel Transaksi.
- Penerapan keamanan dasar pada aplikasi web.

===================================================================================================

# Dokumen Tahap 4 — Analisis Fitur (Feature Analysis)

## Tujuan

Tahap ini bertujuan mendefinisikan fungsi setiap modul dalam **Inventory Management System** secara rinci. Dokumen ini akan menjadi acuan pada tahap perancangan **Flow Sistem**, **Database**, **API**, dan **Antarmuka Pengguna (UI/UX)**.

---

# Modul 1 — Authentication

## Login

Pengguna melakukan login menggunakan:

- Username
- Password

Setelah login berhasil, sistem akan mengidentifikasi **Role** pengguna (Admin Gudang, Staff Gudang, atau Owner) dan menampilkan menu sesuai hak akses masing-masing.

### Fitur

- Login
- Logout
- Validasi Username dan Password
- Session / JWT Authentication

---

## Ganti Password

Setiap pengguna dapat mengganti password miliknya sendiri.

### Tujuan

- Menjaga keamanan akun pengguna.
- Memberikan kontrol penuh terhadap akun masing-masing.

---

## Profil

Setiap pengguna dapat mengubah informasi profil pribadi.

Data yang dapat diubah:

- Nama
- Nomor HP

---

# Modul 2 — Dashboard

Dashboard merupakan halaman utama setelah pengguna berhasil login.

Informasi yang ditampilkan:

- Total Barang
- Total Supplier
- Total Barang Masuk Hari Ini
- Total Barang Keluar Hari Ini
- Jumlah Stok Menipis

Visualisasi Data:

- Grafik Barang Masuk per Bulan
- Grafik Barang Keluar per Bulan

### Tujuan Pembelajaran

- Dashboard
- Statistik
- Visualisasi Data
- Query Agregasi

---

# Modul 3 — Master Barang

Data barang terdiri dari:

- Kode Barang (Otomatis)
- Nama Barang
- Kategori
- Supplier
- Satuan
- Harga Beli
- Harga Jual
- Stok Saat Ini
- Minimum Stok
- Deskripsi

### Fitur

- Tambah Barang
- Edit Barang
- Hapus Barang
- Detail Barang
- Pencarian Barang

Kode Barang dibuat secara otomatis oleh sistem.

---

# Modul 4 — Master Kategori

Data kategori terdiri dari:

- Nama Kategori
- Deskripsi

### Fitur

- Tambah
- Edit
- Hapus
- Lihat Data

---

# Modul 5 — Master Supplier

Data supplier terdiri dari:

- Nama Supplier
- Nama PIC
- Nomor HP
- Email
- Alamat

### Fitur

- Tambah
- Edit
- Hapus
- Lihat Data

---

# Modul 6 — Master Satuan

Data satuan terdiri dari:

- Nama Satuan
- Keterangan

Contoh:

- PCS
- BOX
- PACK
- LITER
- KG

### Fitur

- Tambah
- Edit
- Hapus
- Lihat Data

---

# Modul 7 — Barang Masuk

Data transaksi terdiri dari:

- Nomor Transaksi
- Tanggal
- Barang
- Supplier
- Jumlah
- Keterangan

### Proses

- Menambah stok barang secara otomatis.
- Menyimpan riwayat transaksi.
- Menyimpan informasi pengguna yang melakukan transaksi.

---

# Modul 8 — Barang Keluar

Data transaksi terdiri dari:

- Nomor Transaksi
- Tanggal
- Barang
- Tujuan Pengeluaran
- Jumlah
- Keterangan

### Proses

- Mengurangi stok barang secara otomatis.
- Menyimpan riwayat transaksi.
- Menyimpan informasi pengguna yang melakukan transaksi.

---

# Modul 9 — Laporan

Jenis laporan:

- Laporan Barang Masuk
- Laporan Barang Keluar
- Laporan Stok Barang

Filter laporan:

- Tanggal Awal
- Tanggal Akhir
- Barang
- Supplier
- Kategori

### Tujuan Pembelajaran

- Query Filter
- Rekapitulasi Data
- Penyajian Informasi

---

# Modul 10 — Pengaturan Tema (Light Mode & Dark Mode)

Aplikasi mendukung dua pilihan tema:

- Light Mode
- Dark Mode

### Cara Kerja

- Pengguna dapat mengganti tema melalui **toggle switch** yang berada di **Navbar (pojok kanan atas)** sehingga dapat diakses dari halaman mana pun.
- Setelah tema dipilih, sistem akan menyimpan preferensi tersebut ke **database** berdasarkan akun pengguna.
- Ketika pengguna login kembali, sistem akan otomatis menggunakan tema terakhir yang dipilih tanpa perlu mengatur ulang.

### Tujuan Pembelajaran

- Theme Switching
- Penyimpanan Preferensi Pengguna
- Integrasi Frontend dan Backend
- Pengelolaan State pada Vue.js
- Implementasi Dark Mode menggunakan Tailwind CSS

---

# Modul 11 — Monitoring Stok

Dashboard akan menampilkan indikator berwarna merah apabila jumlah stok barang berada di bawah batas minimum yang telah ditentukan.

Versi pertama **tidak menggunakan popup notifikasi** agar implementasi tetap sederhana dan fokus pada konsep dasar.

---

# Fitur Pendukung

Selain modul utama, aplikasi juga menyediakan:

- Pencarian Barang berdasarkan Nama
- Filter berdasarkan Kategori
- Filter berdasarkan Supplier

---

# Proses Otomatis

Sistem secara otomatis akan:

- Membuat Kode Barang
- Membuat Nomor Transaksi
- Menghitung Penambahan Stok
- Menghitung Pengurangan Stok
- Menampilkan Status Stok Menipis
- Menyimpan Riwayat Pengguna (Created By & Updated By)
- Menyimpan Waktu Pembuatan dan Perubahan Data (Created At & Updated At)
- Menyimpan Preferensi Tema Pengguna

---

# Target Pembelajaran pada Tahap Ini

Melalui tahap ini diharapkan dapat memahami:

- Analisis kebutuhan fitur.
- Penyusunan spesifikasi fungsional.
- Perancangan modul aplikasi.
- Hubungan antar modul.
- Persiapan sebelum membuat Flow Sistem, Database, dan API.

===================================================================================================

# Dokumen Tahap 5 — Analisis Flow Sistem (Business Process)

## Tujuan

Tahap ini bertujuan merancang alur kerja (Business Process) setiap modul pada Inventory Management System.

Dokumen ini menjadi acuan utama sebelum proses desain database, API, dan implementasi aplikasi dimulai.

Dengan adanya Flow Sistem yang jelas, seluruh proses bisnis dapat dipahami sebelum satu baris kode pun ditulis.

---

# Daftar Flow Sistem

Inventory Management System memiliki 12 flow utama.

1. Flow Login
2. Flow Dashboard
3. Flow Master Barang
4. Flow Master Kategori
5. Flow Master Supplier
6. Flow Master Satuan
7. Flow Barang Masuk
8. Flow Barang Keluar
9. Flow Laporan
10. Flow Profil & Ganti Password
11. Flow Pengaturan Tema (Dark Mode)
12. Flow Logout

---

# Flow 1 — Login

## Tujuan

Mengautentikasi pengguna sebelum mengakses aplikasi.

## Alur Sistem

```text
Pengguna membuka aplikasi
        │
        ▼
Halaman Login
        │
        ▼
Input Username & Password
        │
        ▼
Klik Login
        │
        ▼
Validasi Username
        │
        ▼
Validasi Password
        │
        ▼
Login Berhasil
        │
        ▼
Sistem mengenali Role
        │
        ▼
Masuk ke Dashboard
        │
        ▼
Menu tampil sesuai Hak Akses
```

## Business Rules

- Semua pengguna menggunakan halaman login yang sama.
- Dashboard yang digunakan sama untuk semua role.
- Perbedaan hanya pada menu dan hak akses yang ditampilkan.

---

# Flow 2 — Dashboard

## Tujuan

Memberikan informasi ringkasan kondisi inventori.

## Alur Sistem

```text
Login Berhasil
        │
        ▼
Dashboard
        │
        ▼
Menampilkan:

• Total Barang
• Total Supplier
• Barang Masuk Hari Ini
• Barang Keluar Hari Ini
• Stok Menipis
• Grafik Barang Masuk
• Grafik Barang Keluar
```

---

# Flow 3 — Master Barang

## Tujuan

Mengelola seluruh data barang.

## Alur Tambah Barang

```text
Menu Barang
        │
        ▼
Klik Tambah
        │
        ▼
Isi Form
        │
        ▼
Klik Simpan
        │
        ▼
Validasi Data
        │
        ▼
Kode Barang Dibuat Otomatis
        │
        ▼
Data Disimpan
        │
        ▼
Kembali ke Daftar Barang
        │
        ▼
Notifikasi Berhasil
```

## Business Rules

- Kode Barang dibuat otomatis.
- Barang yang sudah pernah digunakan dalam transaksi tidak boleh dihapus.
- Penghapusan diganti dengan mekanisme status Aktif/Tidak Aktif (Soft Delete).

---

# Flow 4 — Master Kategori

## Tujuan

Mengelola kategori barang.

## Alur Sistem

```text
Menu Kategori
        │
        ▼
Tambah / Edit / Hapus
        │
        ▼
Validasi
        │
        ▼
Data Disimpan
```

## Business Rules

- Kategori yang masih digunakan oleh barang tidak boleh dihapus.

---

# Flow 5 — Master Supplier

## Tujuan

Mengelola data supplier.

## Alur Sistem

```text
Menu Supplier
        │
        ▼
Tambah / Edit / Hapus
        │
        ▼
Validasi
        │
        ▼
Data Disimpan
```

## Business Rules

- Supplier yang pernah digunakan dalam transaksi tidak boleh dihapus.

---

# Flow 6 — Master Satuan

## Tujuan

Mengelola data satuan barang.

## Alur Sistem

```text
Menu Satuan
        │
        ▼
Tambah / Edit / Hapus
        │
        ▼
Validasi
        │
        ▼
Data Disimpan
```

## Business Rules

- Satuan yang masih digunakan oleh barang tidak boleh dihapus.

---

# Flow 7 — Barang Masuk

## Tujuan

Menambah stok barang.

## Alur Sistem

```text
Menu Barang Masuk
        │
        ▼
Tambah Transaksi
        │
        ▼
Pilih Barang
        │
        ▼
Input Jumlah
        │
        ▼
Klik Simpan
        │
        ▼
Validasi
        │
        ▼
Transaksi Disimpan
        │
        ▼
Stok Barang Bertambah
        │
        ▼
Riwayat Transaksi Tersimpan
```

## Business Rules

- Setiap transaksi otomatis menambah stok.
- Sistem menyimpan informasi pengguna yang membuat transaksi.
- Sistem menyimpan waktu transaksi.

---

# Flow 8 — Barang Keluar

## Tujuan

Mengurangi stok barang.

## Alur Sistem

```text
Menu Barang Keluar
        │
        ▼
Tambah Transaksi
        │
        ▼
Pilih Barang
        │
        ▼
Input Jumlah
        │
        ▼
Klik Simpan
        │
        ▼
Cek Stok
        │
        ▼
Stok Cukup?
        │
 ┌──────┴──────┐
 │             │
Ya           Tidak
 │             │
 ▼             ▼
Simpan      Tampilkan
Data        Pesan Error
 │
 ▼
Kurangi Stok
 │
 ▼
Riwayat Disimpan
```

## Business Rules

- Stok tidak boleh bernilai negatif.
- Jika stok tidak mencukupi, transaksi dibatalkan.

---

# Flow 9 — Laporan

## Tujuan

Menampilkan data transaksi dalam bentuk laporan.

## Alur Sistem

```text
Menu Laporan
        │
        ▼
Pilih Jenis Laporan
        │
        ▼
Pilih Filter
        │
        ▼
Klik Tampilkan
        │
        ▼
Sistem Menampilkan Data
```

Filter yang tersedia:

- Tanggal Awal
- Tanggal Akhir
- Barang
- Supplier
- Kategori

---

# Flow 10 — Profil & Ganti Password

## Tujuan

Mengelola informasi akun pengguna.

## Alur Sistem

```text
Menu Profil
        │
        ▼
Edit Profil
        │
        ▼
Simpan
```

atau

```text
Menu Profil
        │
        ▼
Ganti Password
        │
        ▼
Masukkan Password Lama
        │
        ▼
Masukkan Password Baru
        │
        ▼
Konfirmasi Password
        │
        ▼
Simpan
```

---

# Flow 11 — Pengaturan Tema (Dark Mode)

## Tujuan

Memberikan pilihan tema sesuai preferensi pengguna.

## Alur Sistem

```text
Klik Toggle Tema
        │
        ▼
Tema Berubah
        │
        ▼
Simpan Preferensi ke Database
        │
        ▼
Saat Login Berikutnya
        │
        ▼
Tema Otomatis Digunakan
```

## Business Rules

- Pergantian tema terjadi secara langsung (real-time) tanpa me-refresh halaman.
- Preferensi tema disimpan berdasarkan akun pengguna.
- Semua role dapat menggunakan fitur ini.

---

# Flow 12 — Logout

## Tujuan

Mengakhiri sesi pengguna dengan aman.

## Alur Sistem

```text
Klik Logout
        │
        ▼
Muncul Konfirmasi
        │
        ▼
Apakah Anda yakin?
        │
 ┌──────┴──────┐
 │             │
Ya          Tidak
 │             │
 ▼             ▼
Logout     Kembali
 │
 ▼
Halaman Login
```

---

# Business Rules Utama

Seluruh aplikasi mengikuti aturan berikut:

- Login wajib dilakukan sebelum mengakses sistem.
- Hak akses ditentukan berdasarkan role pengguna.
- Dashboard yang digunakan sama untuk semua role.
- Barang masuk otomatis menambah stok.
- Barang keluar otomatis mengurangi stok.
- Stok tidak boleh bernilai negatif.
- Barang, Supplier, Kategori, dan Satuan yang sudah digunakan tidak boleh dihapus.
- Penghapusan data menggunakan konsep Soft Delete (Status Aktif/Tidak Aktif).
- Semua transaksi menyimpan informasi pengguna dan waktu transaksi.
- Dark Mode disimpan berdasarkan akun pengguna.
- Logout selalu menampilkan konfirmasi.

---

# Target Pembelajaran pada Tahap Ini

Melalui tahap ini diharapkan dapat memahami:

- Business Process Analysis.
- Penyusunan Flow Sistem.
- Perancangan Business Rules.
- Hubungan antar modul aplikasi.
- Persiapan sebelum mendesain database, API, dan antarmuka pengguna.

===================================================================================================

# Dokumen Tahap 6 — Tech Stack & Arsitektur Project

## Tujuan

Tahap ini bertujuan menentukan teknologi, arsitektur aplikasi, struktur komunikasi antar komponen, serta standar pengembangan yang akan digunakan pada Inventory Management System.

Dokumen ini akan menjadi acuan sebelum memasuki tahap desain database dan implementasi aplikasi.

---

# 1. Arsitektur Sistem

Project menggunakan arsitektur **Client–Server**.

```text
+-----------------------+
|      Browser          |
| (Google Chrome, Edge) |
+-----------+-----------+
            |
            | HTTP Request / JSON
            ▼
+-----------------------+
|      Vue.js Frontend  |
|  (User Interface)     |
+-----------+-----------+
            |
            | REST API
            ▼
+-----------------------+
|   Express.js Backend  |
| (Business Logic/API)  |
+-----------+-----------+
            |
            | SQL Query
            ▼
+-----------------------+
| PostgreSQL Database   |
+-----------------------+
```

Alur komunikasi:

1. Pengguna melakukan aksi pada browser.
2. Vue.js mengirim request ke Backend.
3. Express.js memproses request.
4. Backend membaca atau menyimpan data ke PostgreSQL.
5. Backend mengembalikan data dalam format JSON.
6. Vue.js menampilkan hasil kepada pengguna.

---

# 2. Tech Stack

## Frontend

Framework:

- Vue.js 3

Build Tool:

- Vite

Bahasa:

- JavaScript

Styling:

- Tailwind CSS

Routing:

- Vue Router

HTTP Client:

- Axios

State Management:

- Pinia

Icon:

- Lucide Icons

---

## Backend

Runtime:

- Node.js

Framework:

- Express.js

Authentication:

- JWT (JSON Web Token)

Password Hashing:

- bcrypt

Environment Variable:

- dotenv

CORS:

- cors

Development Utility:

- nodemon

---

## Database

Database Management System:

- PostgreSQL

Database Tool:

- DBeaver

---

## Version Control

- Git
- GitHub

---

# 3. Struktur Komunikasi Sistem

Semua komunikasi menggunakan REST API.

Contoh:

```text
Vue.js
   │
   │ GET /api/barang
   ▼
Express.js
   │
   ▼
PostgreSQL
   │
   ▼
JSON Response
   │
   ▼
Vue.js
```

Format data yang digunakan adalah JSON.

---

# 4. Pola Arsitektur Backend

Backend menggunakan pola berlapis (Layered Architecture).

```text
Routes
   │
   ▼
Controllers
   │
   ▼
Services (Opsional untuk project ini)
   │
   ▼
Models / Queries
   │
   ▼
Database
```

Penjelasan:

### Routes

Menerima request dari frontend dan mengarahkan ke controller yang sesuai.

### Controllers

Menangani logika utama seperti validasi data dan pemanggilan query.

### Services

Lapisan untuk logika bisnis yang lebih kompleks. Pada project pembelajaran ini dapat ditambahkan jika diperlukan.

### Models / Queries

Berisi perintah SQL yang berinteraksi dengan PostgreSQL.

### Database

Menyimpan seluruh data aplikasi.

---

# 5. Struktur Frontend

Folder utama:

```text
src/
│
├── assets/
├── components/
├── composables/
├── layouts/
├── pages/
├── router/
├── services/
├── stores/
├── utils/
├── App.vue
└── main.js
```

Penjelasan:

assets
: Menyimpan gambar, logo, dan file statis.

components
: Komponen yang dapat digunakan kembali.

composables
: Menyimpan reusable logic menggunakan Composition API.

layouts
: Tata letak halaman, misalnya Dashboard Layout.

pages
: Halaman utama aplikasi.

router
: Konfigurasi Vue Router.

services
: Seluruh pemanggilan REST API menggunakan Axios.

stores
: State Management menggunakan Pinia.

utils
: Fungsi bantuan (helper).

---

# 6. Struktur Backend

```text
backend/
│
├── config/
├── controllers/
├── middleware/
├── models/
├── routes/
├── utils/
├── app.js
├── server.js
└── .env
```

Penjelasan:

config
: Konfigurasi database dan aplikasi.

controllers
: Logika request.

middleware
: JWT Authentication, validasi, dan middleware lainnya.

models
: Query SQL.

routes
: Endpoint REST API.

utils
: Helper function.

app.js
: Konfigurasi Express.

server.js
: Menjalankan server.

.env
: Variabel lingkungan.

---

# 7. Standar Penamaan

Folder:

- huruf kecil
- menggunakan bentuk jamak bila sesuai (controllers, routes)

File:

- camelCase

Contoh:

```text
barangController.js
barangRoutes.js
authMiddleware.js
```

Database:

- snake_case

Contoh:

```text
tb_barang
harga_beli
created_at
```

Endpoint API:

Menggunakan bentuk jamak.

Contoh:

```text
GET    /api/barang
POST   /api/barang
PUT    /api/barang/:id
DELETE /api/barang/:id
```

---

# 8. Library yang Digunakan

## Frontend

- vue
- vue-router
- pinia
- axios
- tailwindcss
- lucide-vue-next

## Backend

- express
- pg
- jsonwebtoken
- bcrypt
- dotenv
- cors
- nodemon

---

# 9. Standar Response API

Response berhasil:

```json
{
  "success": true,
  "message": "Data berhasil diambil",
  "data": []
}
```

Response gagal:

```json
{
  "success": false,
  "message": "Data tidak ditemukan"
}
```

---

# 10. Keamanan Dasar

Sistem menerapkan:

- Password disimpan dalam bentuk hash menggunakan bcrypt.
- Autentikasi menggunakan JWT.
- Endpoint tertentu hanya dapat diakses oleh pengguna yang telah login.
- Hak akses dibatasi berdasarkan role pengguna.
- Validasi input dilakukan sebelum data disimpan ke database.

---

# Target Pembelajaran pada Tahap Ini

Melalui tahap ini diharapkan dapat memahami:

- Arsitektur Client–Server.
- Cara kerja REST API.
- Layered Architecture pada Express.js.
- Struktur project Vue.js dan Express.js.
- Peran setiap library yang digunakan.
- Standar pengembangan aplikasi full-stack.

===================================================================================================

# Dokumen Tahap 7 — Desain Database (Database Design)

## Tujuan

Tahap ini bertujuan merancang struktur database yang akan digunakan oleh Inventory Management System.

Database dirancang menggunakan prinsip **Relational Database** dan **Normalisasi** agar data tersimpan secara efisien, tidak terjadi duplikasi, serta mudah dikembangkan pada masa mendatang.

Database yang digunakan adalah **PostgreSQL**.

---

# Konsep Database

Sistem menggunakan pendekatan **Relational Database**, yaitu setiap data yang saling berhubungan akan dihubungkan menggunakan **Primary Key** dan **Foreign Key**.

Seluruh struktur database dirancang agar memenuhi minimal **Third Normal Form (3NF)**.

---

# Daftar Tabel

Inventory Management System memiliki **10 tabel utama**.

| No  | Nama Tabel           | Fungsi                            |
| --- | -------------------- | --------------------------------- |
| 1   | roles                | Menyimpan data hak akses pengguna |
| 2   | users                | Menyimpan data pengguna           |
| 3   | kategori             | Menyimpan kategori barang         |
| 4   | supplier             | Menyimpan data supplier           |
| 5   | satuan               | Menyimpan data satuan barang      |
| 6   | barang               | Menyimpan data master barang      |
| 7   | barang_masuk         | Header transaksi barang masuk     |
| 8   | barang_masuk_detail  | Detail transaksi barang masuk     |
| 9   | barang_keluar        | Header transaksi barang keluar    |
| 10  | barang_keluar_detail | Detail transaksi barang keluar    |

---

# Standar Penamaan Database

Semua nama tabel dan kolom menggunakan format **snake_case**.

Contoh:

- created_at
- updated_at
- created_by
- harga_beli
- harga_jual

Primary Key menggunakan nama:

- id

Foreign Key menggunakan format:

- role_id
- kategori_id
- supplier_id
- satuan_id
- barang_id
- user_id

---

# Standar Kolom Audit

Seluruh tabel master menggunakan kolom berikut:

- created_at
- updated_at
- created_by
- updated_by

Tujuan:

- Mengetahui siapa yang membuat data.
- Mengetahui siapa yang terakhir mengubah data.
- Mengetahui kapan data dibuat.
- Mengetahui kapan data diubah.

---

# Soft Delete

Sistem tidak menggunakan penghapusan permanen (Hard Delete).

Sebagai gantinya digunakan kolom:

```text
is_active BOOLEAN
```

Nilai:

- TRUE = Data Aktif
- FALSE = Data Tidak Aktif

Keuntungan:

- Riwayat transaksi tetap terjaga.
- Data dapat diaktifkan kembali.
- Tidak merusak relasi antar tabel.

---

# Penyimpanan Tema

Preferensi tema pengguna disimpan langsung pada tabel **users**.

Kolom yang digunakan:

```text
theme VARCHAR(10)
```

Nilai yang diperbolehkan:

- light
- dark

Keuntungan:

- Struktur lebih sederhana.
- Mudah diimplementasikan.
- Tema mengikuti akun pengguna meskipun login dari perangkat lain.

---

# Struktur Data Transaksi

Sistem menggunakan pola **Header–Detail**.

## Barang Masuk

### Header

Tabel:

- barang_masuk

Menyimpan:

- Nomor Transaksi
- Tanggal
- Supplier
- User

### Detail

Tabel:

- barang_masuk_detail

Menyimpan:

- Barang
- Jumlah
- Harga Beli
- Referensi ke Header

---

## Barang Keluar

### Header

Tabel:

- barang_keluar

Menyimpan:

- Nomor Transaksi
- Tanggal
- User
- Tujuan Pengeluaran

### Detail

Tabel:

- barang_keluar_detail

Menyimpan:

- Barang
- Jumlah
- Harga Jual
- Referensi ke Header

---

# Penyimpanan Harga

Master Barang menyimpan:

- Harga Beli Terbaru
- Harga Jual Terbaru

Sedangkan setiap transaksi juga menyimpan harga pada tabel detail.

Tujuan:

- Menjaga histori transaksi.
- Laporan lama tetap sesuai dengan harga saat transaksi dilakukan.
- Perubahan harga pada master barang tidak mengubah data transaksi sebelumnya.

---

# Nomor Transaksi

Nomor transaksi disimpan langsung di database.

Contoh:

Barang Masuk

```text
BM000001
```

Barang Keluar

```text
BK000001
```

Keuntungan:

- Nomor transaksi bersifat permanen.
- Mudah digunakan sebagai referensi laporan.
- Tidak berubah meskipun aplikasi diakses kembali.

---

# Aturan Relasi

Hubungan antar tabel menggunakan Foreign Key.

Contoh relasi:

- Satu Role memiliki banyak User.
- Satu Kategori memiliki banyak Barang.
- Satu Supplier memiliki banyak Barang.
- Satu Satuan memiliki banyak Barang.
- Satu Barang Masuk memiliki banyak Detail Barang Masuk.
- Satu Barang Keluar memiliki banyak Detail Barang Keluar.

---

# Aturan Integritas Data

Database menerapkan aturan berikut:

- Barang yang sudah digunakan dalam transaksi tidak boleh dihapus.
- Supplier yang sudah digunakan tidak boleh dihapus.
- Kategori yang masih digunakan tidak boleh dihapus.
- Satuan yang masih digunakan tidak boleh dihapus.
- Stok tidak boleh bernilai negatif.
- Seluruh transaksi wajib memiliki pengguna yang membuat transaksi.
- Setiap transaksi wajib memiliki minimal satu detail barang.

---

# Normalisasi Database

Database dirancang hingga minimal **Third Normal Form (3NF)**.

## First Normal Form (1NF)

- Tidak ada data yang berulang dalam satu kolom.
- Setiap kolom memiliki satu nilai (atomic value).

## Second Normal Form (2NF)

- Semua atribut non-key bergantung penuh pada Primary Key.

## Third Normal Form (3NF)

- Tidak ada ketergantungan transitif.
- Data dipisahkan ke dalam tabel master dan tabel transaksi.

---

# Tipe Data PostgreSQL (Rencana)

| Data         | Tipe                  |
| ------------ | --------------------- |
| ID           | SERIAL atau BIGSERIAL |
| Nama         | VARCHAR               |
| Deskripsi    | TEXT                  |
| Harga        | NUMERIC(15,2)         |
| Jumlah       | INTEGER               |
| Status Aktif | BOOLEAN               |
| Tema         | VARCHAR(10)           |
| Tanggal      | DATE                  |
| Waktu        | TIMESTAMP             |

---

# Target Pembelajaran pada Tahap Ini

Melalui tahap ini diharapkan dapat memahami:

- Perancangan Relational Database.
- Primary Key dan Foreign Key.
- Header–Detail Transaction.
- Normalisasi hingga Third Normal Form (3NF).
- Audit Trail.
- Soft Delete.
- Penyimpanan histori transaksi.
- Penyimpanan preferensi pengguna.

===================================================================================================

# Dokumen Tahap 8 — Entity Relationship Diagram (ERD)

## Tujuan

Tahap ini bertujuan merancang hubungan antar tabel (Entity Relationship Diagram) pada Inventory Management System.

ERD menjadi acuan utama dalam pembuatan database PostgreSQL, query SQL, REST API, serta implementasi backend.

Diagram ini menggambarkan bagaimana setiap tabel saling berhubungan melalui Primary Key (PK) dan Foreign Key (FK).

---

# Daftar Entity

Inventory Management System terdiri dari **11 entity (tabel)**.

| No  | Entity               | Fungsi                           |
| --- | -------------------- | -------------------------------- |
| 1   | roles                | Data hak akses pengguna          |
| 2   | users                | Data pengguna                    |
| 3   | kategori             | Master kategori barang           |
| 4   | supplier             | Master supplier                  |
| 5   | satuan               | Master satuan                    |
| 6   | barang               | Master barang                    |
| 7   | tujuan_pengeluaran   | Master tujuan pengeluaran barang |
| 8   | barang_masuk         | Header transaksi barang masuk    |
| 9   | barang_masuk_detail  | Detail transaksi barang masuk    |
| 10  | barang_keluar        | Header transaksi barang keluar   |
| 11  | barang_keluar_detail | Detail transaksi barang keluar   |

---

# Primary Key

Seluruh tabel menggunakan Primary Key dengan nama:

```text
id
```

Setiap nilai **id** bersifat unik dan digunakan sebagai identitas utama setiap data.

---

# Foreign Key

Foreign Key digunakan untuk menghubungkan antar tabel.

| Tabel                | Foreign Key           |
| -------------------- | --------------------- |
| users                | role_id               |
| barang               | kategori_id           |
| barang               | supplier_id           |
| barang               | satuan_id             |
| barang_masuk         | supplier_id           |
| barang_masuk         | user_id               |
| barang_masuk_detail  | barang_masuk_id       |
| barang_masuk_detail  | barang_id             |
| barang_keluar        | user_id               |
| barang_keluar        | tujuan_pengeluaran_id |
| barang_keluar_detail | barang_keluar_id      |
| barang_keluar_detail | barang_id             |

---

# Kardinalitas Relasi

## 1. Roles → Users

Satu role dapat dimiliki oleh banyak pengguna.

```text
roles
  │
  └──────────────< users
```

Relasi:

**One to Many (1:N)**

---

## 2. Kategori → Barang

Satu kategori dapat memiliki banyak barang.

```text
kategori
    │
    └──────────────< barang
```

Relasi:

**One to Many (1:N)**

---

## 3. Supplier → Barang

Satu supplier dapat menyediakan banyak barang.

```text
supplier
     │
     └──────────────< barang
```

Relasi:

**One to Many (1:N)**

---

## 4. Satuan → Barang

Satu satuan dapat digunakan oleh banyak barang.

```text
satuan
    │
    └──────────────< barang
```

Relasi:

**One to Many (1:N)**

---

## 5. Supplier → Barang Masuk

Satu supplier dapat memiliki banyak transaksi barang masuk.

```text
supplier
     │
     └──────────────< barang_masuk
```

Relasi:

**One to Many (1:N)**

---

## 6. Users → Barang Masuk

Satu pengguna dapat membuat banyak transaksi barang masuk.

```text
users
   │
   └──────────────< barang_masuk
```

Relasi:

**One to Many (1:N)**

---

## 7. Barang Masuk → Barang Masuk Detail

Satu transaksi barang masuk dapat memiliki banyak detail barang.

```text
barang_masuk
      │
      └──────────────< barang_masuk_detail
```

Relasi:

**One to Many (1:N)**

---

## 8. Barang → Barang Masuk Detail

Satu barang dapat muncul pada banyak transaksi barang masuk.

```text
barang
   │
   └──────────────< barang_masuk_detail
```

Relasi:

**One to Many (1:N)**

---

## 9. Users → Barang Keluar

Satu pengguna dapat membuat banyak transaksi barang keluar.

```text
users
   │
   └──────────────< barang_keluar
```

Relasi:

**One to Many (1:N)**

---

## 10. Tujuan Pengeluaran → Barang Keluar

Satu tujuan pengeluaran dapat digunakan pada banyak transaksi barang keluar.

```text
tujuan_pengeluaran
          │
          └──────────────< barang_keluar
```

Relasi:

**One to Many (1:N)**

---

## 11. Barang Keluar → Barang Keluar Detail

Satu transaksi barang keluar dapat memiliki banyak detail barang.

```text
barang_keluar
       │
       └──────────────< barang_keluar_detail
```

Relasi:

**One to Many (1:N)**

---

## 12. Barang → Barang Keluar Detail

Satu barang dapat muncul pada banyak transaksi barang keluar.

```text
barang
   │
   └──────────────< barang_keluar_detail
```

Relasi:

**One to Many (1:N)**

---

# Diagram ERD

```text
roles
   │
   └──────────────< users
                       │
             ┌─────────┴─────────┐
             │                   │
             ▼                   ▼
      barang_masuk        barang_keluar
          │                     │
          │                     │
          ▼                     ▼
barang_masuk_detail   barang_keluar_detail
          ▲                     ▲
          │                     │
          └──────── barang ─────┘
                   ▲
      ┌────────────┼────────────┐
      │            │            │
      │            │            │
 kategori      supplier      satuan

tujuan_pengeluaran
          │
          └──────────────< barang_keluar
```

---

# Aturan Integritas Relasi

Database menerapkan aturan berikut:

- Role harus ada sebelum User dibuat.
- Kategori harus ada sebelum Barang dibuat.
- Supplier harus ada sebelum Barang dibuat.
- Satuan harus ada sebelum Barang dibuat.
- Tujuan Pengeluaran harus ada sebelum transaksi Barang Keluar dibuat.
- Barang harus ada sebelum dimasukkan ke transaksi.
- Setiap transaksi Barang Masuk wajib memiliki minimal satu detail.
- Setiap transaksi Barang Keluar wajib memiliki minimal satu detail.

---

# Normalisasi

Struktur ERD memenuhi minimal **Third Normal Form (3NF)**.

Penerapan normalisasi:

- Data master dipisahkan dari data transaksi.
- Header transaksi dipisahkan dari detail transaksi.
- Tidak ada data yang disimpan berulang dalam satu tabel.
- Hubungan antar tabel menggunakan Foreign Key.

---

# Keuntungan Desain ERD

Dengan desain ini sistem memiliki beberapa kelebihan:

- Struktur database lebih rapi.
- Mengurangi duplikasi data.
- Menjaga konsistensi data.
- Memudahkan pembuatan query JOIN.
- Mempermudah pengembangan fitur baru.
- Mudah dipelihara.
- Skalabel jika jumlah data semakin besar.

---

# Target Pembelajaran pada Tahap Ini

Melalui tahap ini diharapkan dapat memahami:

- Konsep Entity Relationship Diagram (ERD).
- Entity, Attribute, Primary Key, dan Foreign Key.
- Kardinalitas relasi (One-to-Many).
- Hubungan antara tabel master dan tabel transaksi.
- Penerapan normalisasi pada desain database.
- Persiapan sebelum membuat query SQL PostgreSQL.

===================================================================================================

# Dokumen Tahap 9 — Desain REST API

## Tujuan

Tahap ini bertujuan merancang komunikasi antara Frontend (Vue.js) dan Backend (Express.js) menggunakan arsitektur REST API.

Dokumen ini menjadi acuan dalam pembuatan endpoint, request, response, autentikasi, serta standar komunikasi data.

---

# Standar REST API

Seluruh endpoint menggunakan prefix:

```text
/api/v1
```

Contoh:

```text
GET    /api/v1/barang
POST   /api/v1/barang
PUT    /api/v1/barang/:id
DELETE /api/v1/barang/:id
```

---

# Standar HTTP Method

| Method | Fungsi           |
| ------ | ---------------- |
| GET    | Mengambil Data   |
| POST   | Menambah Data    |
| PUT    | Mengubah Data    |
| DELETE | Soft Delete Data |

---

# Authentication API

## Login

```http
POST /api/v1/login
```

Request

```json
{
  "username": "admin",
  "password": "password123"
}
```

Response

```json
{
  "success": true,
  "message": "Login berhasil",
  "data": {
    "token": "...",
    "user": {}
  }
}
```

---

## Logout

```http
POST /api/v1/logout
```

---

## Ganti Password

```http
PUT /api/v1/profile/password
```

---

## Profil

```http
GET /api/v1/profile
```

```http
PUT /api/v1/profile
```

---

# Role API

## Melihat Role

```http
GET /api/v1/roles
```

---

# User API

## Semua User

```http
GET /api/v1/users
```

## Detail User

```http
GET /api/v1/users/:id
```

## Tambah User

```http
POST /api/v1/users
```

## Update User

```http
PUT /api/v1/users/:id
```

## Hapus User (Soft Delete)

```http
DELETE /api/v1/users/:id
```

---

# Kategori API

```http
GET    /api/v1/kategori
GET    /api/v1/kategori/:id
POST   /api/v1/kategori
PUT    /api/v1/kategori/:id
DELETE /api/v1/kategori/:id
```

---

# Supplier API

```http
GET    /api/v1/supplier
GET    /api/v1/supplier/:id
POST   /api/v1/supplier
PUT    /api/v1/supplier/:id
DELETE /api/v1/supplier/:id
```

---

# Satuan API

```http
GET    /api/v1/satuan
GET    /api/v1/satuan/:id
POST   /api/v1/satuan
PUT    /api/v1/satuan/:id
DELETE /api/v1/satuan/:id
```

---

# Barang API

```http
GET    /api/v1/barang
GET    /api/v1/barang/:id
POST   /api/v1/barang
PUT    /api/v1/barang/:id
DELETE /api/v1/barang/:id
```

---

# Tujuan Pengeluaran API

```http
GET    /api/v1/tujuan-pengeluaran
GET    /api/v1/tujuan-pengeluaran/:id
POST   /api/v1/tujuan-pengeluaran
PUT    /api/v1/tujuan-pengeluaran/:id
DELETE /api/v1/tujuan-pengeluaran/:id
```

---

# Barang Masuk API

## Daftar Transaksi

```http
GET /api/v1/barang-masuk
```

## Detail Transaksi

```http
GET /api/v1/barang-masuk/:id
```

## Tambah Transaksi

```http
POST /api/v1/barang-masuk
```

Saat endpoint ini dipanggil, backend akan:

- Menyimpan data ke tabel `barang_masuk`.
- Menyimpan data ke tabel `barang_masuk_detail`.
- Menambah stok barang secara otomatis.
- Menyimpan informasi pengguna yang melakukan transaksi.

---

# Barang Keluar API

## Daftar Transaksi

```http
GET /api/v1/barang-keluar
```

## Detail Transaksi

```http
GET /api/v1/barang-keluar/:id
```

## Tambah Transaksi

```http
POST /api/v1/barang-keluar
```

Saat endpoint ini dipanggil, backend akan:

- Memeriksa stok barang.
- Menolak transaksi jika stok tidak mencukupi.
- Menyimpan data ke tabel `barang_keluar`.
- Menyimpan data ke tabel `barang_keluar_detail`.
- Mengurangi stok barang secara otomatis.

---

# Dashboard API

```http
GET /api/v1/dashboard
```

Response berisi:

- Total Barang
- Total Supplier
- Barang Masuk Hari Ini
- Barang Keluar Hari Ini
- Jumlah Stok Menipis
- Grafik Barang Masuk
- Grafik Barang Keluar

Frontend hanya memerlukan satu request untuk memperoleh seluruh data dashboard.

---

# Laporan API

## Barang Masuk

```http
GET /api/v1/laporan/barang-masuk
```

## Barang Keluar

```http
GET /api/v1/laporan/barang-keluar
```

## Laporan Stok

```http
GET /api/v1/laporan/stok
```

---

# Query Parameter

## Pagination

```http
GET /api/v1/barang?page=1&limit=10
```

---

## Search

```http
GET /api/v1/barang?search=laptop
```

---

## Filter

```http
GET /api/v1/barang?kategori=1&supplier=2
```

---

## Sorting

```http
GET /api/v1/barang?sort=nama_barang&order=asc
```

---

# Format Response API

## Response Berhasil

```json
{
  "success": true,
  "message": "Data berhasil diambil",
  "data": []
}
```

---

## Response Gagal

```json
{
  "success": false,
  "message": "Data tidak ditemukan",
  "data": null
}
```

---

# Authentication

Endpoint yang membutuhkan login harus menggunakan JWT.

Contoh Header:

```http
Authorization: Bearer <token>
```

---

# Soft Delete

Endpoint DELETE tidak menghapus data secara permanen.

Backend hanya mengubah:

```text
is_active = false
```

Dengan demikian riwayat transaksi tetap terjaga dan relasi database tidak rusak.

---

# Standar Penamaan Endpoint

- Menggunakan Bahasa Indonesia.
- Menggunakan huruf kecil.
- Menggunakan tanda hubung (`-`) untuk nama yang terdiri dari lebih dari satu kata.

Contoh:

- `/api/v1/barang`
- `/api/v1/barang-masuk`
- `/api/v1/barang-keluar`
- `/api/v1/tujuan-pengeluaran`

---

# Target Pembelajaran pada Tahap Ini

Melalui tahap ini diharapkan dapat memahami:

- Konsep REST API.
- HTTP Method.
- Request dan Response.
- JWT Authentication.
- Pagination.
- Search.
- Filter.
- Sorting.
- Soft Delete.
- Integrasi Vue.js dengan Express.js.

===================================================================================================

# Dokumen Tahap 10 — Desain UI/UX

## Tujuan

Tahap ini bertujuan merancang tampilan antarmuka (User Interface) dan pengalaman pengguna (User Experience) pada Inventory Management System.

Desain dibuat dengan prinsip:

- Sederhana
- Konsisten
- Mudah digunakan
- Responsif
- Mudah dikembangkan

Framework frontend yang digunakan adalah Vue.js dengan Tailwind CSS.

---

# Konsep Desain

Aplikasi menggunakan konsep **Dashboard Admin** modern.

Karakteristik:

- Sidebar di sebelah kiri.
- Navbar di bagian atas.
- Area konten di tengah.
- Tampilan bersih (Clean UI).
- Menggunakan banyak ruang kosong (Whitespace).
- Ikon sederhana.
- Warna konsisten.

---

# Warna Utama

Primary Color

```text
Blue
```

Digunakan untuk:

- Tombol utama
- Link aktif
- Header
- Highlight

Secondary Color

```text
Gray
```

Digunakan untuk:

- Background
- Border
- Card

Success

```text
Green
```

Digunakan untuk:

- Data berhasil
- Status aktif

Warning

```text
Yellow
```

Digunakan untuk:

- Peringatan

Danger

```text
Red
```

Digunakan untuk:

- Hapus data
- Error
- Stok menipis

---

# Layout Utama

```text
+------------------------------------------------------+
| Navbar                                                |
+-----------+------------------------------------------+
| Sidebar   |                                          |
|           |                                          |
|           |          Content Area                    |
|           |                                          |
|           |                                          |
+-----------+------------------------------------------+
```

---

# Sidebar

Sidebar berada di sisi kiri aplikasi.

Menu:

- Dashboard
- Barang
- Kategori
- Supplier
- Satuan
- Tujuan Pengeluaran
- Barang Masuk
- Barang Keluar
- Laporan

Bagian bawah Sidebar:

- Profile
- Logout

Menu yang tampil mengikuti Role pengguna.

---

# Navbar

Navbar berada di bagian atas.

Komponen:

- Judul Halaman
- Breadcrumb
- Toggle Dark Mode
- Nama Pengguna
- Foto Profil (Tidak digunakan pada versi pertama)
- Dropdown User

---

# Dashboard

Dashboard menampilkan:

Card:

- Total Barang
- Total Supplier
- Barang Masuk Hari Ini
- Barang Keluar Hari Ini
- Stok Menipis

Grafik:

- Barang Masuk per Bulan
- Barang Keluar per Bulan

Tabel:

- Barang dengan stok menipis

---

# Halaman Login

Komponen:

- Logo
- Nama Aplikasi
- Username
- Password
- Tombol Login

Jika login gagal:

- Muncul pesan error.

---

# Halaman Master

Digunakan untuk:

- Barang
- Supplier
- Kategori
- Satuan
- Tujuan Pengeluaran

Struktur halaman:

Header

↓

Judul

↓

Tombol Tambah

↓

Search

↓

Filter

↓

Tabel

↓

Pagination

---

# Tabel

Kolom umum:

- Nomor
- Data
- Status
- Aksi

Aksi:

- Detail
- Edit
- Nonaktifkan

Tidak menggunakan tombol "Hapus Permanen".

---

# Form Input

Semua form memiliki struktur yang sama.

Urutan:

Label

↓

Input

↓

Validasi

↓

Tombol

Komponen:

- Textbox
- Number
- Select
- Date Picker
- Textarea

Tombol:

- Simpan
- Reset
- Batal

---

# Barang Masuk

Halaman terdiri dari:

Informasi Header

- Nomor Transaksi
- Tanggal
- Supplier

Detail Barang

Tabel:

- Barang
- Qty
- Harga Beli

Button:

Tambah Baris

↓

Simpan

---

# Barang Keluar

Header:

- Nomor Transaksi
- Tanggal
- Tujuan Pengeluaran

Detail:

- Barang
- Qty
- Harga Jual

Sistem akan menampilkan sisa stok ketika barang dipilih.

---

# Laporan

Filter:

- Tanggal
- Barang
- Supplier
- Kategori

Button:

- Tampilkan

Hasil:

- Tabel Data

---

# Dark Mode

Dark Mode dapat diaktifkan melalui toggle pada Navbar.

Saat tema berubah:

- Seluruh halaman berubah secara langsung tanpa refresh.
- Preferensi disimpan berdasarkan akun pengguna.

---

# Notifikasi

Jenis notifikasi:

Success

- Data berhasil disimpan.

Warning

- Konfirmasi logout.

Danger

- Gagal menyimpan data.
- Stok tidak mencukupi.
- Validasi gagal.

---

# Loading

Seluruh request API menampilkan loading.

Contoh:

- Login
- Simpan
- Update
- Hapus
- Pencarian

---

# Empty State

Jika data kosong.

Tampilkan:

"Belum ada data."

Disertai ikon yang sesuai.

---

# Validasi Form

Jika input salah:

- Border berubah merah.
- Pesan kesalahan muncul di bawah input.
- Fokus kembali ke input yang salah.

---

# Komponen Reusable

Komponen yang digunakan berulang:

- Button
- Input
- Select
- Modal
- Card
- Table
- Pagination
- Search Box
- Loading Spinner
- Badge Status
- Confirm Dialog

---

# Responsive Design

Desktop

- Sidebar selalu tampil.

Tablet

- Sidebar dapat disembunyikan.

Mobile

- Sidebar menjadi Drawer.

Semua halaman tetap dapat digunakan dengan baik pada berbagai ukuran layar.

---

# Prinsip UI/UX

Aplikasi menerapkan prinsip:

- Konsisten.
- Mudah dipahami.
- Navigasi sederhana.
- Mengurangi jumlah klik.
- Memberikan umpan balik yang jelas kepada pengguna.
- Tampilan bersih dan profesional.

---

# Target Pembelajaran pada Tahap Ini

Melalui tahap ini diharapkan dapat memahami:

- Perancangan UI sebelum implementasi.
- Konsistensi desain antarmuka.
- Penggunaan komponen reusable.
- Responsive Design.
- Dasar UX untuk aplikasi dashboard.
- Persiapan implementasi menggunakan Vue.js dan Tailwind CSS.

===================================================================================================

# Dokumen Tahap 11 — Struktur Project

## Tujuan

Tahap ini bertujuan membangun struktur folder yang rapi, konsisten, dan mudah dikembangkan untuk aplikasi Inventory Management System.

Project dipisahkan menjadi dua bagian utama:

- Backend (Express.js)
- Frontend (Vue.js)

---

# Struktur Folder

```text
inventory-management-system/
│
├── backend/
│
└── frontend/
```

Kedua project berjalan secara terpisah tetapi saling berkomunikasi melalui REST API.

---

# Struktur Backend

```text
backend/
│
├── src/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── utils/
│   ├── validations/
│   ├── app.js
│   └── server.js
│
├── uploads/
│
├── .env
├── .env.example
├── package.json
└── README.md
```

---

# Penjelasan Folder Backend

## config/

Berisi konfigurasi aplikasi.

Contoh:

- Database PostgreSQL
- JWT
- Environment

---

## controllers/

Menerima request dari frontend.

Contoh:

```text
barangController.js
supplierController.js
authController.js
```

Controller bertugas:

- menerima request
- memanggil service
- mengirim response

---

## services/

Berisi business logic.

Contoh:

```text
barangService.js
```

Misalnya:

- validasi stok
- generate nomor transaksi
- menghitung dashboard

Dengan memisahkan business logic ke service, controller menjadi lebih sederhana dan mudah diuji.

---

## models/

Berisi query database.

Contoh:

```text
barangModel.js
supplierModel.js
```

Tugasnya:

- SELECT
- INSERT
- UPDATE
- DELETE (Soft Delete)

---

## routes/

Menghubungkan URL ke controller.

Contoh:

```text
barangRoutes.js
```

---

## middleware/

Berisi middleware Express.

Contoh:

- JWT Authentication
- Role Authorization
- Error Handler
- Request Logger

---

## validations/

Berisi validasi request.

Contoh:

- Login Validation
- Barang Validation
- Supplier Validation

Memisahkan validasi dari controller membuat kode lebih bersih.

---

## utils/

Berisi fungsi yang dapat digunakan di banyak tempat.

Contoh:

- generateKodeBarang()
- generateNomorTransaksi()
- formatTanggal()
- responseHelper()

---

## app.js

Berfungsi untuk:

- membuat instance Express
- memasang middleware
- mendaftarkan route
- konfigurasi aplikasi

Tidak menjalankan server secara langsung.

---

## server.js

Entry point aplikasi.

Tugasnya:

- membaca konfigurasi
- menjalankan HTTP Server
- menentukan port

---

# Struktur Frontend

```text
frontend/
│
├── public/
│
├── src/
│   ├── assets/
│   ├── components/
│   ├── composables/
│   ├── layouts/
│   ├── pages/
│   ├── router/
│   ├── services/
│   ├── stores/
│   ├── utils/
│   ├── App.vue
│   └── main.js
│
├── package.json
└── vite.config.js
```

---

# Penjelasan Folder Frontend

## assets/

Berisi:

- logo
- icon
- gambar
- file CSS

---

## components/

Komponen yang digunakan berulang.

Contoh:

- BaseButton
- BaseInput
- BaseTable
- BaseModal
- BaseCard

---

## layouts/

Template halaman.

Contoh:

- AuthLayout
- DashboardLayout

---

## pages/

Setiap halaman utama aplikasi.

Contoh:

- LoginPage
- DashboardPage
- BarangPage
- SupplierPage
- BarangMasukPage

---

## router/

Konfigurasi Vue Router.

---

## services/

Berisi komunikasi ke REST API menggunakan Axios.

Contoh:

```text
barangService.js
authService.js
```

---

## stores/

State management menggunakan Pinia.

Contoh:

- authStore
- themeStore
- userStore

---

## composables/

Logic yang dapat digunakan kembali.

Contoh:

- usePagination
- useSearch
- useToast

---

## utils/

Helper frontend.

Contoh:

- formatRupiah
- formatTanggal
- debounce

---

# Alur Request

```text
Frontend

↓

Axios

↓

Express Route

↓

Controller

↓

Service

↓

Model

↓

PostgreSQL
```

Response:

```text
PostgreSQL

↓

Model

↓

Service

↓

Controller

↓

Frontend
```

---

# Naming Convention

## Folder

Gunakan huruf kecil.

Contoh:

```text
controllers
routes
services
```

---

## File

Gunakan camelCase.

Contoh:

```text
barangController.js
barangService.js
```

---

## Vue Component

Gunakan PascalCase.

Contoh:

```text
BaseButton.vue
DashboardCard.vue
BarangTable.vue
```

---

# Prinsip Pengembangan

- Satu file memiliki satu tanggung jawab.
- Hindari kode yang berulang.
- Pisahkan business logic dari query database.
- Gunakan nama file yang konsisten.
- Semua endpoint mengikuti standar REST API.

---

# Target Pembelajaran

Melalui tahap ini diharapkan memahami:

- Struktur project Express.js.
- Struktur project Vue.js.
- Fungsi setiap folder.
- Alur request dari frontend ke database.
- Pemisahan tanggung jawab (Separation of Concerns).
- Dasar arsitektur aplikasi yang mudah dikembangkan.
