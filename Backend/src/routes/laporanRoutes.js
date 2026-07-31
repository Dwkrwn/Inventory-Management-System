const express = require('express');
const controller = require('../controllers/laporanController');
const authMiddleware = require('../middleware/auth');
const roleAuth = require('../middleware/roleAuth');

const router = express.Router();

router.use(authMiddleware);

router.get('/barang-masuk', roleAuth('admin', 'staff', 'owner'), controller.getBarangMasuk);
router.get('/barang-keluar', roleAuth('admin', 'staff', 'owner'), controller.getBarangKeluar);
router.get('/stok', roleAuth('admin', 'staff', 'owner'), controller.getStok);

module.exports = router;
