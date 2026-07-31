const express = require('express');
const supplierController = require('../controllers/supplierController');
const authMiddleware = require('../middleware/auth');
const roleAuth = require('../middleware/roleAuth');
const validate = require('../middleware/validate');
const { supplierSchema } = require('../validations/masterValidation');

const router = express.Router();

router.use(authMiddleware);

router.get('/', roleAuth('admin', 'staff', 'owner'), supplierController.index);
router.get('/:id', roleAuth('admin', 'staff', 'owner'), supplierController.show);
router.post('/', roleAuth('admin'), validate(supplierSchema), supplierController.store);
router.put('/:id', roleAuth('admin'), validate(supplierSchema), supplierController.update);
router.delete('/:id', roleAuth('admin'), supplierController.destroy);

module.exports = router;
