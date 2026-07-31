const express = require('express');
const tujuanController = require('../controllers/tujuanPengeluaranController');
const authMiddleware = require('../middleware/auth');
const roleAuth = require('../middleware/roleAuth');
const validate = require('../middleware/validate');
const { tujuanSchema } = require('../validations/masterValidation');

const router = express.Router();

router.use(authMiddleware);

router.get('/', roleAuth('admin', 'staff', 'owner'), tujuanController.index);
router.get('/:id', roleAuth('admin', 'staff', 'owner'), tujuanController.show);
router.post('/', roleAuth('admin'), validate(tujuanSchema), tujuanController.store);
router.put('/:id', roleAuth('admin'), validate(tujuanSchema), tujuanController.update);
router.delete('/:id', roleAuth('admin'), tujuanController.destroy);

module.exports = router;
