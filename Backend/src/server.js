const app = require('./app');
const env = require('./config/env');
const pool = require('./config/db');

const start = async () => {
  try {
    await pool.query('SELECT 1');
    console.log('[DB] Koneksi PostgreSQL berhasil');

    app.listen(env.port, () => {
      console.log(`[SERVER] API berjalan pada port ${env.port}`);
    });
  } catch (err) {
    console.error('[DB] Gagal koneksi ke PostgreSQL:', err.message);
    console.error('Pastikan PostgreSQL aktif dan kredensial di .env sudah benar.');
    process.exit(1);
  }
};

start();
