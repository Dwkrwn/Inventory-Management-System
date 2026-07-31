const express = require('express');
const controller = require('../controllers/dashboardController');
const authMiddleware = require('../middleware/auth');
const roleAuth = require('../middleware/roleAuth');

const router = express.Router();

router.use(authMiddleware);
router.get('/', roleAuth('admin', 'staff', 'owner'), controller.index);

module.exports = router;
