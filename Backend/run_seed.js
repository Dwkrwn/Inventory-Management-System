const { Client } = require('pg');
const fs = require('fs');

const client = new Client({
  host: 'localhost',
  port: 5432,
  database: 'db_inventory',
  user: 'postgres',
  password: '123456',
});

(async () => {
  try {
    await client.connect();
    const sql = fs.readFileSync(__dirname + '/db/seed.sql', 'utf8');
    await client.query(sql);
    const { rows } = await client.query('SELECT (SELECT COUNT(*) FROM users) AS users, (SELECT COUNT(*) FROM roles) AS roles, (SELECT COUNT(*) FROM kategori) AS kategori, (SELECT COUNT(*) FROM satuan) AS satuan, (SELECT COUNT(*) FROM tujuan_pengeluaran) AS tujuan');
    console.log('SEED OK:', JSON.stringify(rows[0]));
  } catch (err) {
    console.error('SEED GAGAL:', err.message);
    process.exitCode = 1;
  } finally {
    await client.end();
  }
})();
