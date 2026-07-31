const express = require('express');
const controller = require('../controllers/barangKeluarController');
const authMiddleware = require('../middleware/auth');
const roleAuth = require('../middleware/roleAuth');
const validate = require('../middleware/validate');
const { barangKeluarSchema } = require('../validations/transaksiValidation');

const router = express.Router();

router.use(authMiddleware);

router.get('/', roleAuth('admin', 'staff', 'owner'), controller.index);
router.get('/:id', roleAuth('admin', 'staff', 'owner'), controller.show);
router.post('/', roleAuth('admin', 'staff'), validate(barangKeluarSchema), controller.store);

module.exports = router;
