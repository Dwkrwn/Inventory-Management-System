const { error } = require('../utils/responseHelper');

const roleAuth = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return error(res, 'Silakan login terlebih dahulu', 401);
    }

    if (!roles.includes(req.user.role)) {
      return error(res, 'Anda tidak memiliki hak akses untuk fitur ini', 403);
    }

    next();
  };
};

module.exports = roleAuth;
