const pool = require('../config/db');

const generateKodeBarang = async () => {
  const { rows } = await pool.query('SELECT COUNT(*)::int AS total FROM barang');
  return `BRG${String(rows[0].total + 1).padStart(6, '0')}`;
};

const generateNomorTransaksi = async (prefix) => {
  const table = prefix === 'BM' ? 'barang_masuk' : 'barang_keluar';
  const { rows } = await pool.query(
    `SELECT COUNT(*)::int AS total FROM ${table}`
  );
  return `${prefix}${String(rows[0].total + 1).padStart(6, '0')}`;
};

const getPagination = (req) => {
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 10;
  const offset = (page - 1) * limit;
  return { page, limit, offset };
};

const getSort = (req, whitelist) => {
  const sort = whitelist.includes(req.query.sort) ? req.query.sort : 'id';
  const order = req.query.order === 'asc' ? 'ASC' : 'DESC';
  return { sort, order };
};

module.exports = { generateKodeBarang, generateNomorTransaksi, getPagination, getSort };
