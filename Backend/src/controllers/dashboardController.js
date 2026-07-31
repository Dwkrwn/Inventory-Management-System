const { success } = require('../utils/responseHelper');
const dashboardService = require('../services/dashboardService');

const index = async (req, res, next) => {
  try {
    const data = await dashboardService.getDashboard();
    return success(res, 'Data dashboard berhasil diambil', data);
  } catch (err) {
    next(err);
  }
};

module.exports = { index };
