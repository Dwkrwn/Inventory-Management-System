const { error } = require('../utils/responseHelper');

const errorHandler = (err, req, res, next) => {
  console.error('[ERROR]', err);

  if (err.type === 'ValidationError') {
    return error(res, err.message, 422, err.fields);
  }

  if (err.code === '23505') {
    return error(res, 'Data sudah terdaftar / duplikat', 409);
  }

  if (err.code === '23503') {
    return error(res, 'Data masih digunakan oleh data lain', 409);
  }

  if (err.code === '23514') {
    return error(res, 'Data tidak valid (melanggar constraint database)', 400);
  }

  if (err.code === '22P02') {
    return error(res, 'Format data tidak valid', 400);
  }

  return error(res, err.message || 'Terjadi kesalahan pada server', 500);
};

module.exports = errorHandler;
