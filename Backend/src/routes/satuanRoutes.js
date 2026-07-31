const express = require('express');
const satuanController = require('../controllers/satuanController');
const authMiddleware = require('../middleware/auth');
const roleAuth = require('../middleware/roleAuth');
const validate = require('../middleware/validate');
const { satuanSchema } = require('../validations/masterValidation');

const router = express.Router();

router.use(authMiddleware);

router.get('/', roleAuth('admin', 'staff', 'owner'), satuanController.index);
router.get('/:id', roleAuth('admin', 'staff', 'owner'), satuanController.show);
router.post('/', roleAuth('admin'), validate(satuanSchema), satuanController.store);
router.put('/:id', roleAuth('admin'), validate(satuanSchema), satuanController.update);
router.delete('/:id', roleAuth('admin'), satuanController.destroy);

module.exports = router;
