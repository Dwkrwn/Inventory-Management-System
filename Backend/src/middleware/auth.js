const jwt = require('jsonwebtoken');
const env = require('../config/env');
const { error } = require('../utils/responseHelper');

const authMiddleware = (req, res, next) => {
  const header = req.headers.authorization;

  if (!header || !header.startsWith('Bearer ')) {
    return error(res, 'Silakan login terlebih dahulu', 401);
  }

  const token = header.split(' ')[1];

  try {
    const decoded = jwt.verify(token, env.jwt.secret);
    req.user = decoded;
    next();
  } catch (err) {
    return error(res, 'Token tidak valid atau sudah kedaluwarsa', 401);
  }
};

module.exports = authMiddleware;
